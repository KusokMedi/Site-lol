import { createReadStream } from "node:fs";
import { readdir, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

/**
 * Files are read from `public/files` at runtime, so a file dropped into that
 * directory is instantly downloadable - no code changes and no manifest.
 *
 * This handler is used by `next dev`, `NEXT_SERVER_RUNTIME=1` and Vercel. The
 * file extension is `server.ts` because the static (GitHub Pages) build must
 * not see it: a static export cannot send Content-Disposition headers. There,
 * `page.export.tsx` is included instead and generates one download page per
 * file. `pageExtensions` in next.config.ts swaps the two files per environment.
 */
const FILES_ROOT = path.join(process.cwd(), "public", "files");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/**
 * Static export needs at least one param for a dynamic segment. The placeholder
 * is never served in practice: the post-build script replaces the whole
 * `out/files/download` tree with one download page per real file. On Vercel and
 * in `next dev` the list stays empty and the route is fully dynamic.
 */
export function generateStaticParams() {
  if (
    process.env.VERCEL === "1" ||
    process.env.NEXT_SERVER_RUNTIME === "1" ||
    process.env.NODE_ENV === "development"
  ) {
    return [];
  }
  return [{ path: ["_placeholder"] }];
}

const MIME_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".css": "text/css; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".eot": "application/vnd.ms-fontobject",
  ".epub": "application/epub+zip",
  ".flac": "audio/flac",
  ".gif": "image/gif",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".gz": "application/gzip",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".m4a": "audio/mp4",
  ".m4v": "video/mp4",
  ".map": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mov": "video/quicktime",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".oga": "audio/ogg",
  ".ogg": "audio/ogg",
  ".ogv": "video/ogg",
  ".opus": "audio/opus",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".rar": "application/vnd.rar",
  ".rtf": "application/rtf",
  ".svg": "image/svg+xml",
  ".tar": "application/x-tar",
  ".toml": "application/toml; charset=utf-8",
  ".tsv": "text/tab-separated-values; charset=utf-8",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".wav": "audio/wav",
  ".webm": "video/webm",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".xz": "application/x-xz",
  ".yaml": "application/yaml; charset=utf-8",
  ".yml": "application/yaml; charset=utf-8",
  ".zip": "application/zip",
  ".7z": "application/x-7z-compressed",
};

function contentTypeFor(fileName: string): string {
  return MIME_TYPES[path.extname(fileName).toLowerCase()] ?? "application/octet-stream";
}

/**
 * Rejects anything that could escape the root before it ever touches the
 * filesystem. Next.js already splits the catch-all segment, but an encoded
 * separator can still arrive inside a single segment.
 */
function sanitizeSegments(segments: readonly string[] | undefined): string[] | null {
  if (!segments || segments.length === 0) return null;

  const clean: string[] = [];
  for (const segment of segments) {
    if (typeof segment !== "string" || segment.length === 0) return null;
    if (segment === "." || segment === "..") return null;
    if (segment.includes("/") || segment.includes("\\")) return null;
    if (segment.includes("\0")) return null;
    for (const ch of segment) {
      const code = ch.charCodeAt(0);
      if (code < 0x20 || code === 0x7f) return null;
    }
    clean.push(segment);
  }
  return clean;
}

/**
 * Returns the real path of a regular file inside `public/files`, or null.
 * The containment check is performed both on the resolved path and on the
 * real path, so symlinks cannot point outside the directory either.
 */
async function resolveFile(segments: readonly string[]): Promise<string | null> {
  const root = path.resolve(FILES_ROOT);
  const target = path.resolve(root, ...segments);

  if (target === root || !target.startsWith(root + path.sep)) return null;

  try {
    const [realRoot, realTarget] = await Promise.all([realpath(root), realpath(target)]);
    if (realTarget === realRoot || !realTarget.startsWith(realRoot + path.sep)) return null;

    const info = await stat(realTarget);
    if (!info.isFile()) return null;

    return realTarget;
  } catch {
    return null;
  }
}

async function resolveDirectory(segments: readonly string[]): Promise<string | null> {
  const root = path.resolve(FILES_ROOT);
  const target = segments.length === 0 ? root : path.resolve(root, ...segments);

  if (target !== root && !target.startsWith(root + path.sep)) return null;

  try {
    const [realRoot, realTarget] = await Promise.all([realpath(root), realpath(target)]);
    if (realTarget !== realRoot && !realTarget.startsWith(realRoot + path.sep)) return null;

    const info = await stat(realTarget);
    if (!info.isDirectory()) return null;

    return realTarget;
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
function encodeFilename(fileName: string): string {
  return encodeURIComponent(fileName).replace(/['()*]/g, (char) =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function contentDisposition(fileName: string): string {
  // ASCII fallback for old clients, RFC 5987 value for everything else.
  const fallback = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  return `attachment; filename="${fallback}"; filename*=UTF-8''${encodeFilename(fileName)}`;
}

type ByteRange = { start: number; end: number };

/**
 * Parses a single `bytes=` range. Multiple ranges are deliberately ignored:
 * sending the whole file with 200 is a valid response and avoids multipart
 * bodies. Returns "invalid" when the client asked for an unsatisfiable range.
 */
function parseRange(header: string | null, size: number): ByteRange | "invalid" | null {
  if (!header) return null;

  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;

  const [, rawStart, rawEnd] = match;
  if (rawStart === "" && rawEnd === "") return "invalid";
  if (size === 0) return "invalid";

  let start: number;
  let end: number;

  if (rawStart === "") {
    const suffixLength = Number(rawEnd);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return "invalid";
    start = Math.max(0, size - suffixLength);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd === "" ? size - 1 : Number(rawEnd);

    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return "invalid";
    if (start >= size || start > end) return "invalid";
    end = Math.min(end, size - 1);
  }

  return { start, end };
}

function baseHeaders(fileName: string): Headers {
  return new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Content-Disposition": contentDisposition(fileName),
    "Content-Type": contentTypeFor(fileName),
    "X-Content-Type-Options": "nosniff",
  });
}

function notFound(): Response {
  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function badRequest(): Response {
  return new Response("Bad Request", {
    status: 400,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

async function listDirectory(segments: string[], dirPath: string): Promise<string> {
  const realRoot = await realpath(FILES_ROOT);
  const entries = await readdir(dirPath, { withFileTypes: true });
  const items: { name: string; isDir: boolean }[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const entryPath = path.join(dirPath, entry.name);
    let isDir = entry.isDirectory();

    if (entry.isSymbolicLink()) {
      try {
        const real = await realpath(entryPath);
        if (real !== realRoot && !real.startsWith(realRoot + path.sep)) continue;
        isDir = (await stat(real)).isDirectory();
      } catch {
        continue;
      }
    }

    items.push({ name: entry.name, isDir });
  }

  items.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );

  const parentHref =
    segments.length > 1
      ? `/files/download/${segments
          .slice(0, -1)
          .map(encodeURIComponent)
          .join("/")}/`
      : "/files/";

  const rows = items
    .map((item) => {
      const href = item.isDir
        ? `/files/download/${[...segments, item.name]
            .map(encodeURIComponent)
            .join("/")}/`
        : `/files/download/${[...segments, item.name]
            .map(encodeURIComponent)
            .join("/")}`;
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(item.name)}${
        item.isDir ? "/" : ""
      }</a></li>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Index of /files/download/${escapeHtml(segments.join("/"))}</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 24px; font: 16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif; background: Canvas; color: CanvasText; }
  main { max-width: 48rem; margin: 0 auto; }
  h1 { font-size: 1.25rem; word-break: break-all; }
  ul { list-style: none; padding: 0; }
  li { padding: 0.25rem 0; }
  a { color: LinkText; overflow-wrap: anywhere; }
</style>
</head>
<body>
<main>
  <h1>Index of /files/download/${escapeHtml(segments.join("/"))}/</h1>
  <p><a href="${escapeHtml(parentHref)}">..</a></p>
  <ul>${rows}</ul>
</main>
</body>
</html>`;
}

async function handle(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
  headOnly: boolean,
): Promise<Response> {
  const segments = sanitizeSegments((await context.params).path);
  if (!segments) return badRequest();

  const dirPath = await resolveDirectory(segments);
  if (dirPath) {
    if (headOnly) {
      return new Response(null, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const html = await listDirectory(segments, dirPath);
    return new Response(html, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }

  const filePath = await resolveFile(segments);
  if (!filePath) return notFound();

  const info = await stat(filePath);
  const size = info.size;
  const fileName = segments[segments.length - 1];
  const range = parseRange(request.headers.get("range"), size);

  if (range === "invalid") {
    const headers = baseHeaders(fileName);
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }

  const headers = baseHeaders(fileName);

  if (range) {
    headers.set("Content-Length", String(range.end - range.start + 1));
    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);

    if (headOnly) return new Response(null, { status: 206, headers });

    const stream = createReadStream(filePath, { start: range.start, end: range.end });
    return new Response(Readable.toWeb(stream) as ReadableStream, { status: 206, headers });
  }

  headers.set("Content-Length", String(size));

  if (headOnly) return new Response(null, { status: 200, headers });

  const stream = createReadStream(filePath);
  return new Response(Readable.toWeb(stream) as ReadableStream, { status: 200, headers });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  const isServerRuntime =
    process.env.VERCEL === "1" ||
    process.env.NEXT_SERVER_RUNTIME === "1" ||
    process.env.NODE_ENV === "development";

  if (!isServerRuntime) {
    return new Response("Not Found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return handle(request, context, false);
}

export async function HEAD(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  const isServerRuntime =
    process.env.VERCEL === "1" ||
    process.env.NEXT_SERVER_RUNTIME === "1" ||
    process.env.NODE_ENV === "development";

  if (!isServerRuntime) {
    return new Response(null, { status: 404 });
  }

  return handle(request, context, true);
}

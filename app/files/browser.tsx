import { readdir, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { notFound, redirect } from "next/navigation";

export const FILES_ROOT = path.join(process.cwd(), "public", "files");
const RESERVED_TOP_LEVEL = new Set(["download"]);

export async function collectDirectories(
  dir: string = FILES_ROOT,
  prefix: string[] = [],
): Promise<string[][]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const dirs: string[][] = [];
  const hasIndex = entries.some(
    (entry) => entry.isFile() && entry.name === "index.html",
  );

  if (!hasIndex) dirs.push(prefix);

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;
    if (!entry.isDirectory()) continue;
    if (prefix.length === 0 && RESERVED_TOP_LEVEL.has(entry.name)) continue;

    dirs.push(
      ...(await collectDirectories(path.join(dir, entry.name), [
        ...prefix,
        entry.name,
      ])),
    );
  }

  return dirs;
}

// escapeHtml removed (unused)

export async function FilesBrowser({
  segments,
}: {
  segments: string[];
}) {
  const clean = segments.filter(
    (segment) =>
      typeof segment === "string" &&
      segment.length > 0 &&
      segment !== "." &&
      segment !== ".." &&
      !segment.includes("/") &&
      !segment.includes("\\"),
  );

  if (clean.length !== segments.length) notFound();
  if (clean[0] && RESERVED_TOP_LEVEL.has(clean[0])) notFound();

  const root = path.resolve(FILES_ROOT);
  const target = clean.length === 0 ? root : path.resolve(root, ...clean);

  if (target !== root && !target.startsWith(root + path.sep)) notFound();

  let realRoot: string;
  let realTarget: string;
  try {
    [realRoot, realTarget] = await Promise.all([realpath(root), realpath(target)]);
  } catch {
    notFound();
  }

  if (realTarget !== realRoot && !realTarget.startsWith(realRoot + path.sep)) {
    notFound();
  }

  let info;
  try {
    info = await stat(realTarget);
  } catch {
    notFound();
  }

  if (!info.isDirectory()) notFound();

  const indexPath = path.join(realTarget, "index.html");
  let hasIndex = false;
  try {
    hasIndex = (await stat(indexPath)).isFile();
  } catch {
    hasIndex = false;
  }

  if (hasIndex) {
    redirect(
      `/files/${[...clean, "index.html"].map(encodeURIComponent).join("/")}`,
    );
  }

  let entries;
  try {
    entries = await readdir(realTarget, { withFileTypes: true });
  } catch {
    notFound();
  }

  const items: { name: string; isDir: boolean }[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const entryPath = path.join(realTarget, entry.name);
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
    clean.length > 1
      ? `/files/${clean.slice(0, -1).map(encodeURIComponent).join("/")}/`
      : "/files/";

  const title = `/files/${clean.join("/")}/`;

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        padding: "24px",
        font: '16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "Canvas",
        color: "CanvasText",
      }}
    >
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.25rem", wordBreak: "break-all" }}>
          Index of {title}
        </h1>
        <p>
          <a href={parentHref} style={{ color: "LinkText" }}>
            ..
          </a>
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => {
            const href = item.isDir
              ? `/files/${[...clean, item.name].map(encodeURIComponent).join("/")}/`
              : `/files/${[...clean, item.name].map(encodeURIComponent).join("/")}`;
            return (
              <li key={item.name} style={{ padding: "0.25rem 0" }}>
                <a href={href} style={{ color: "LinkText", overflowWrap: "anywhere" }}>
                  {item.name}
                  {item.isDir ? "/" : ""}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

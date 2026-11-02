#!/usr/bin/env node
/**
 * GitHub Pages (and any other purely static host) cannot send
 * `Content-Disposition`, so `/files/download/...` is served by a tiny generated
 * page instead. Every file in `public/files` gets
 * `out/files/download/<path>/index.html`; the page immediately triggers a
 * same-origin download of the real file with the `download` attribute.
 *
 * On Vercel the site runs as a Next.js server and this script is a no-op:
 * there is no `out/index.html`, and `app/files/download/[...path]/route.ts`
 * answers with real HTTP headers, streaming and Range support.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, "out");
const filesDir = path.join(projectRoot, "public", "files");

if (!existsSync(path.join(outDir, "index.html"))) {
  console.log("[files] no static export found - download pages skipped");
  process.exit(0);
}

if (!existsSync(filesDir)) {
  console.log("[files] public/files does not exist - nothing to generate");
  process.exit(0);
}

/** `/files/download` is the route itself; it cannot also be a source folder. */
const RESERVED_TOP_LEVEL = "download";

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
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

async function walk(dir, prefix = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const segments = [...prefix, entry.name];
    const absolute = path.join(dir, entry.name);

    // Symlinks are skipped: they can point outside the project and are not
    // reproducible in a static build anyway.
    if (entry.isSymbolicLink()) {
      console.warn(`[files] skipping symlink ${segments.join("/")}`);
      continue;
    }

    if (entry.name.startsWith(".")) continue;

    if (entry.isDirectory()) {
      files.push(...(await walk(absolute, segments)));
    } else if (entry.isFile()) {
      if (prefix.length === 0 && entry.name === RESERVED_TOP_LEVEL) {
        console.warn(
          `[files] skipping ${segments.join("/")}: public/files/${RESERVED_TOP_LEVEL}/ is reserved for the download route`,
        );
        continue;
      }
      files.push({ absolute, segments });
    }
  }

  return files;
}

function downloadPage({ href, fileName }) {
  const safeHref = escapeHtml(href);
  const safeName = escapeHtml(fileName);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Download ${safeName}</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    font: 16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif;
    background: Canvas;
    color: CanvasText;
  }
  main { max-width: 32rem; text-align: center; }
  a { color: LinkText; overflow-wrap: anywhere; }
  p { margin: 0 0 1rem; }
</style>
</head>
<body>
<main>
  <p>Downloading <strong>${safeName}</strong>&hellip;</p>
  <p>If the download did not start, <a id="download-link" href="${safeHref}" download="${safeName}">click here</a>.</p>
</main>
<script>
  document.getElementById("download-link").click();
</script>
</body>
</html>
`;
}

const files = await walk(filesDir);
let generated = 0;

// Remove anything the static export left under out/files/download (the
// placeholder route response, or a reserved source folder) before writing
// clean wrapper pages.
const downloadOutDir = path.join(outDir, "files", "download");
await rm(downloadOutDir, { recursive: true, force: true });

for (const { segments } of files) {
  if (segments[0] === RESERVED_TOP_LEVEL) continue;

  const targetDir = path.join(outDir, "files", "download", ...segments);
  const href = `/files/${segments.map(encodeURIComponent).join("/")}`;
  const fileName = segments[segments.length - 1];

  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, "index.html"), downloadPage({ href, fileName }), "utf8");
  generated += 1;
}

console.log(`[files] generated ${generated} download page(s)`);

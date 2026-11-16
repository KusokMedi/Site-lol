#!/usr/bin/env node
/**
 * GitHub Pages (and any other purely static host) cannot send
 * `Content-Disposition`, so `/files/download/...` is served by a tiny generated
 * page instead. Every file in `public/files` gets
 * `out/files/download/<path>/index.html`; the page immediately triggers a
 * same-origin download of the real file with the `download` attribute.
 *
 * Directories without their own `index.html` get a generated listing page for
 * both ordinary browsing (`/files/...`) and downloads (`/files/download/...`).
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

async function walkFiles(dir, prefix = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;

    const segments = [...prefix, entry.name];
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (prefix.length === 0 && entry.name === RESERVED_TOP_LEVEL) continue;
      files.push(...(await walkFiles(absolute, segments)));
    } else if (entry.isFile()) {
      if (prefix.length === 0 && entry.name === RESERVED_TOP_LEVEL) continue;
      files.push({ segments });
    }
  }

  return files;
}

async function listDirectoryEntries(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;
    items.push({ name: entry.name, isDir: entry.isDirectory() });
  }

  items.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );

  return items;
}

async function collectDirectories(dir, prefix = []) {
  const dirs = [prefix];
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return dirs;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;
    if (!entry.isDirectory()) continue;
    if (prefix.length === 0 && entry.name === RESERVED_TOP_LEVEL) continue;

    const segments = [...prefix, entry.name];
    dirs.push(...(await collectDirectories(path.join(dir, entry.name), segments)));
  }

  return dirs;
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

function directoryPage({ title, entries, makeHref, parentHref }) {
  const rows = entries
    .map((entry) => {
      const href = makeHref(entry);
      return `<li><a href="${escapeHtml(href)}">${escapeHtml(entry.name)}${
        entry.isDir ? "/" : ""
      }</a></li>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
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
  <h1>${escapeHtml(title)}</h1>
  <p><a href="${escapeHtml(parentHref)}">..</a></p>
  <ul>${rows}</ul>
</main>
</body>
</html>
`;
}

const files = await walkFiles(filesDir);
const directories = await collectDirectories(filesDir);

let generatedFiles = 0;
let generatedDirs = 0;

// Remove anything the static export left under out/files/download before
// writing clean wrapper/listing pages.
const downloadOutDir = path.join(outDir, "files", "download");
await rm(downloadOutDir, { recursive: true, force: true });

// File download wrappers.
for (const { segments } of files) {
  const targetDir = path.join(outDir, "files", "download", ...segments);
  const href = `/files/${segments.map(encodeURIComponent).join("/")}`;
  const fileName = segments[segments.length - 1];

  await mkdir(targetDir, { recursive: true });
  await writeFile(
    path.join(targetDir, "index.html"),
    downloadPage({ href, fileName }),
    "utf8",
  );
  generatedFiles += 1;
}

// Directory listings.
for (const segments of directories) {
  const sourceDir = path.join(filesDir, ...segments);
  const hasIndex = existsSync(path.join(sourceDir, "index.html"));

  if (!hasIndex) {
    const entries = await listDirectoryEntries(sourceDir);
    const parentSegments = segments.slice(0, -1);
    const downloadParent =
      parentSegments.length > 0
        ? `/files/download/${parentSegments.map(encodeURIComponent).join("/")}/`
        : "/files/";

    const downloadDir = path.join(outDir, "files", "download", ...segments);
    await mkdir(downloadDir, { recursive: true });
    await writeFile(
      path.join(downloadDir, "index.html"),
      directoryPage({
        title: `Index of /files/download/${segments.join("/")}/`,
        entries,
        makeHref: (entry) =>
          entry.isDir
            ? `/files/download/${[...segments, entry.name].map(encodeURIComponent).join("/")}/`
            : `/files/download/${[...segments, entry.name].map(encodeURIComponent).join("/")}`,
        parentHref: downloadParent,
      }),
      "utf8",
    );

    generatedDirs += 1;
  }
}

console.log(
  `[files] generated ${generatedFiles} download page(s), ${generatedDirs} directory listing(s)`,
);

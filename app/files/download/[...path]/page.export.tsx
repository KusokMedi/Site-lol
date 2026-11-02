import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";
import DownloadTrigger from "@/components/DownloadTrigger";

export const dynamic = "force-static";
export const dynamicParams = false;

const FILES_ROOT = path.join(process.cwd(), "public", "files");
const RESERVED = new Set(["download"]);

async function collect(dir: string, prefix: string[] = []): Promise<string[][]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const found: string[][] = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.isSymbolicLink()) continue;

    const segments = [...prefix, entry.name];
    if (prefix.length === 0 && RESERVED.has(entry.name)) continue;

    if (entry.isDirectory()) {
      found.push(...(await collect(path.join(dir, entry.name), segments)));
    } else if (entry.isFile()) {
      found.push(segments);
    }
  }

  return found;
}

export async function generateStaticParams() {
  const files = await collect(FILES_ROOT);
  if (files.length === 0) {
    return [{ path: ["_placeholder"] }];
  }
  return files.map((segments) => ({ path: segments }));
}

export const metadata: Metadata = {
  title: "Download file",
  robots: { index: false, follow: false },
};

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path: segments } = await params;
  if (segments[0] === "_placeholder") {
    return (
      <main
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          font: '16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif',
          background: "Canvas",
          color: "CanvasText",
        }}
      >
        <p>No files are available for download.</p>
      </main>
    );
  }

  const fileName = segments[segments.length - 1] ?? "file";
  const href = `/files/${segments.map(encodeURIComponent).join("/")}`;

  return (
    <main
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        font: '16px/1.5 system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "Canvas",
        color: "CanvasText",
      }}
    >
      <div style={{ maxWidth: "32rem", textAlign: "center" }}>
        <p style={{ margin: "0 0 1rem" }}>
          Downloading <strong>{fileName}</strong>&hellip;
        </p>
        <p style={{ margin: 0 }}>
          If the download did not start,{" "}
          <DownloadTrigger href={href} fileName={fileName} />.
        </p>
      </div>
    </main>
  );
}

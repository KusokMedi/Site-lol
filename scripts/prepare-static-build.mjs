#!/usr/bin/env node
/**
 * Static export cannot use `force-dynamic`, so the real route handler is
 * temporarily replaced with a minimal static version. `restore-route.mjs`
 * puts it back after the build.
 */
import { existsSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

const route = path.join(
  process.cwd(),
  "app/files/download/[...path]/route.ts",
);
const backup = path.join(process.cwd(), "scripts/.route.ts.server-backup");

const isServerRuntime =
  process.env.VERCEL === "1" ||
  process.env.NEXT_SERVER_RUNTIME === "1" ||
  process.env.NODE_ENV === "development";

if (isServerRuntime) {
  if (existsSync(backup) && !existsSync(route)) {
    renameSync(backup, route);
    console.log("[files] restored server route");
  }
  process.exit(0);
}

if (existsSync(route) && !existsSync(backup)) {
  renameSync(route, backup);
}

const minimal = `import { realpath } from "node:fs/promises";
import path from "node:path";

const FILES_ROOT = path.join(process.cwd(), "public", "files");

export const runtime = "nodejs";

export function generateStaticParams() {
  return [{ path: ["_placeholder"] }];
}

export async function GET() {
  return new Response("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function HEAD() {
  return new Response(null, { status: 404 });
}
`;

writeFileSync(route, minimal, "utf8");
console.log("[files] prepared static route");

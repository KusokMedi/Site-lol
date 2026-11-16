#!/usr/bin/env node
import { existsSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

const route = path.join(
  process.cwd(),
  "app/files/download/[...path]/route.ts",
);
const backup = path.join(process.cwd(), "scripts/.route.ts.server-backup");

if (existsSync(backup)) {
  if (existsSync(route)) rmSync(route, { force: true });
  renameSync(backup, route);
  console.log("[files] restored server route");
}

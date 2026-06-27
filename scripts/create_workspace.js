#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const args = process.argv.slice(2);

function readFlag(name, fallback = "") {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function timestamp(date = new Date()) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-") + "-" + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
}

function usage() {
  console.log(`Usage:
node create_workspace.js [--prefix vibe-app-plan] [--base ~/Desktop] [--dry-run]

Creates a new timestamped workspace folder on the Desktop by default.`);
}

if (hasFlag("--help")) {
  usage();
  process.exit(0);
}

const prefix = readFlag("--prefix", "vibe-app-plan");
const base = readFlag("--base", path.join(os.homedir(), "Desktop")).replace(/^~(?=$|\/)/, os.homedir());
const dryRun = hasFlag("--dry-run");

let workspacePath = path.join(base, `${prefix}-${timestamp()}`);
let suffix = 1;

while (fs.existsSync(workspacePath)) {
  workspacePath = path.join(base, `${prefix}-${timestamp()}-${String(suffix).padStart(2, "0")}`);
  suffix += 1;
}

if (!dryRun) {
  fs.mkdirSync(workspacePath, { recursive: true });
}

console.log(JSON.stringify({
  created: !dryRun,
  workspacePath,
  cdCommand: `cd ${JSON.stringify(workspacePath)}`,
}, null, 2));

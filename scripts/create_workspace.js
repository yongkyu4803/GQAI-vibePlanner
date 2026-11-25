#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");
const { parseArgs, str, expandHome } = require("./lib/args");

const { flags } = parseArgs();

if (flags.help) {
  console.log(`Usage:
node create_workspace.js [--prefix vibe-app-plan] [--base ~/Desktop] [--dry-run]

새 작업 폴더를 만든다. 기본 위치는 바탕화면이고, 바탕화면이 없으면 홈 폴더를 쓴다.`);
  process.exit(0);
}

const pad = (v) => String(v).padStart(2, "0");
const d = new Date();
const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;

const desktop = path.join(os.homedir(), "Desktop");
const base = path.resolve(expandHome(str(flags, "base", fs.existsSync(desktop) ? desktop : os.homedir())));
const prefix = str(flags, "prefix", "vibe-app-plan").replace(/[\\/]/g, "-");
const dryRun = flags["dry-run"] === true;

let workspacePath = path.join(base, `${prefix}-${stamp}`);
for (let n = 1; fs.existsSync(workspacePath); n += 1) {
  workspacePath = path.join(base, `${prefix}-${stamp}-${pad(n)}`);
}

if (!dryRun) fs.mkdirSync(workspacePath, { recursive: true });

console.log(JSON.stringify({
  created: !dryRun,
  workspacePath,
  // Claude Code 세션은 이 폴더로 옮겨가지 않을 수 있으므로, 이후 스크립트에는 --root 로 이 경로를 넘긴다.
  nextCommandHint: `node ~/.claude/skills/GQAI-vibe-planner/scripts/check_workspace.js ${JSON.stringify(workspacePath)}`,
}, null, 2));

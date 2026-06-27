#!/usr/bin/env node
const fs = require("fs");
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

function usage() {
  console.log(`Usage:
node create_planning_docs.js --level html --app-name "App" --idea "Idea" --audience "Users" --problem "Problem" [--out docs/planning] [--overwrite]

Run workspace preflight before creating files:
  node ~/.claude/skills/GQAI-vibe-planner/scripts/check_workspace.js

If the current folder is not appropriate, create a Desktop timestamp workspace:
  node ~/.claude/skills/GQAI-vibe-planner/scripts/create_workspace.js

Levels:
  html          Level 1. One HTML file, no server
  local-server  Level 2. Simple local Node/Express server
  full          Level 3. Full planning docs

Default level: html`);
}

if (hasFlag("--help")) {
  usage();
  process.exit(0);
}

const outputDir = readFlag("--out", "docs/planning");
const level = readFlag("--level", "html");
const levelConfig = {
  html: {
    label: "Level 1. One HTML",
    templateDir: path.join("assets", "templates", "level-1-html"),
  },
  "local-server": {
    label: "Level 2. Local Server",
    templateDir: path.join("assets", "templates", "level-2-local-server"),
  },
  full: {
    label: "Level 3. Full Project",
    templateDir: path.join("assets", "templates"),
  },
};

if (!levelConfig[level]) {
  console.error(`Unknown level: ${level}`);
  console.error("Use one of: html, local-server, full");
  process.exit(1);
}

const values = {
  APP_NAME: readFlag("--app-name", "앱 이름 미정"),
  IDEA: readFlag("--idea", "아이디어 미정"),
  AUDIENCE: readFlag("--audience", "대상 사용자 미정"),
  PROBLEM: readFlag("--problem", "해결할 문제 미정"),
  DATE: new Date().toISOString().slice(0, 10),
  PROJECT_ROOT: process.cwd(),
  LEVEL: level,
  LEVEL_LABEL: levelConfig[level].label,
};

const skillDir = path.resolve(__dirname, "..");
const templateDir = path.join(skillDir, levelConfig[level].templateDir);
const targetDir = path.resolve(process.cwd(), outputDir);
const overwrite = hasFlag("--overwrite");
const rootTemplates = new Set(["PROJECT_GUIDE.md"]);

function render(content) {
  return content.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => values[key] ?? "");
}

function collectFiles(dir, baseDir = dir) {
  const result = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const current = path.join(dir, name);
    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      if (level === "full") continue;
      result.push(...collectFiles(current, baseDir));
      continue;
    }

    if (level === "full" && !name.endsWith(".md")) continue;
    result.push({
      source: current,
      relative: path.relative(baseDir, current),
    });
  }
  return result;
}

const created = [];
const skipped = [];

for (const file of collectFiles(templateDir)) {
  const target = level === "full" && rootTemplates.has(file.relative)
    ? path.resolve(process.cwd(), file.relative)
    : level === "full"
      ? path.join(targetDir, file.relative)
      : path.resolve(process.cwd(), file.relative);

  if (fs.existsSync(target) && !overwrite) {
    skipped.push(path.relative(process.cwd(), target));
    continue;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(fs.readFileSync(file.source, "utf8")), "utf8");
  created.push(path.relative(process.cwd(), target));
}

console.log(JSON.stringify({ level, levelLabel: levelConfig[level].label, outputDir: path.relative(process.cwd(), targetDir), created, skipped }, null, 2));

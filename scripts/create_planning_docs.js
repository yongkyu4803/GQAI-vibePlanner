#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { parseArgs, str, expandHome } = require("./lib/args");

const { flags } = parseArgs();

const LEVELS = {
  html: "Level 1. One HTML",
  "local-server": "Level 2. Local Server",
  full: "Level 3. Full Project",
};
const DEFAULT_STACK = "Next.js + Supabase + Vercel (기본값)";

if (flags.help) {
  console.log(`Usage:
node create_planning_docs.js --level <html|local-server|full> --app-name "앱" --idea "한 줄" \\
  --audience "사용자" --problem "문제" [--stack "스택"] [--root <폴더>] [--out docs/planning] \\
  [--upgrade] [--overwrite]

  --root      문서를 만들 프로젝트 루트 (기본: 현재 폴더)
  --out       상세 문서 폴더, root 기준 (기본: docs/planning)
  --stack     full 레벨 기술 스택 (기본: ${DEFAULT_STACK})
  --upgrade   이미 있는 파일은 건드리지 않고 새 레벨 버전을 <out>/_upgrade/<level>/ 에 써서 병합 대상으로 알려준다
  --overwrite 이미 있는 파일을 덮어쓴다 (주의)`);
  process.exit(0);
}

const level = str(flags, "level", "html");
if (!LEVELS[level]) {
  console.error(`Unknown level: ${level}. Use one of: ${Object.keys(LEVELS).join(", ")}`);
  process.exit(1);
}

const root = path.resolve(expandHome(str(flags, "root", process.cwd())));
if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`--root 폴더가 없습니다: ${root}`);
  process.exit(1);
}
const outRel = str(flags, "out", "docs/planning").replace(/\/+$/, "");
const outDir = path.resolve(root, outRel);
const planningDirLink = path.relative(root, outDir).split(path.sep).join("/") || ".";
const overwrite = flags.overwrite === true;
const upgrade = flags.upgrade === true;

const values = {
  APP_NAME: str(flags, "app-name", "앱 이름 미정"),
  IDEA: str(flags, "idea", "아이디어 미정"),
  AUDIENCE: str(flags, "audience", "대상 사용자 미정"),
  PROBLEM: str(flags, "problem", "해결할 문제 미정"),
  STACK: str(flags, "stack", DEFAULT_STACK),
  DATE: new Date().toISOString().slice(0, 10),
  PROJECT_ROOT: root,
  PLANNING_DIR: planningDirLink,
  LEVEL: level,
  LEVEL_LABEL: LEVELS[level],
};

function render(content) {
  return content.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => (key in values ? values[key] : match));
}

function collect(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort().flatMap((name) => {
    const full = path.join(dir, name);
    return fs.statSync(full).isDirectory() ? collect(full, base) : [path.relative(base, full)];
  });
}

// 템플릿의 docs/planning/* 는 --out 으로, 나머지는 root 로 간다.
function targetFor(relative) {
  const parts = relative.split(path.sep);
  if (parts[0] === "docs" && parts[1] === "planning") {
    return path.join(outDir, ...parts.slice(2));
  }
  return path.join(root, relative);
}

const templatesDir = path.join(__dirname, "..", "assets", "templates");
const sources = [
  ...collect(path.join(templatesDir, "shared")).map((r) => [path.join(templatesDir, "shared", r), r]),
  ...collect(path.join(templatesDir, level)).map((r) => [path.join(templatesDir, level, r), r]),
];

const created = [];
const skipped = [];
const pendingMerge = [];
const rel = (p) => path.relative(root, p).split(path.sep).join("/");

for (const [source, relative] of sources) {
  let target = targetFor(relative);
  const exists = fs.existsSync(target);

  if (exists && !overwrite) {
    if (!upgrade) {
      skipped.push(rel(target));
      continue;
    }
    const staged = path.join(outDir, "_upgrade", level, relative.split(path.sep).slice(relative.startsWith("docs") ? 2 : 0).join(path.sep));
    pendingMerge.push({ existing: rel(target), newVersion: rel(staged) });
    target = staged;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(fs.readFileSync(source, "utf8")), "utf8");
  if (!pendingMerge.some((m) => m.newVersion === rel(target))) created.push(rel(target));
}

const result = { level, levelLabel: LEVELS[level], root, planningDir: planningDirLink, created, skipped };
if (upgrade) {
  result.pendingMerge = pendingMerge;
  result.nextStep = pendingMerge.length
    ? "pendingMerge의 newVersion 내용을 existing 파일에 병합하고, PROJECT_GUIDE.md 레벨 코드·레벨 변경 기록을 갱신한 뒤 _upgrade 폴더를 지운다."
    : "병합할 파일 없음. PROJECT_GUIDE.md 레벨 정보만 갱신한다.";
}
if (skipped.length && !upgrade) {
  result.note = "이미 있는 파일은 건너뛰었습니다. 레벨을 올리는 중이면 --upgrade 를 쓰세요.";
}
console.log(JSON.stringify(result, null, 2));

#!/usr/bin/env node
// 작업 폴더 사전 점검. 사용: node check_workspace.js [폴더] (기본: 현재 폴더)
const fs = require("fs");
const path = require("path");
const { parseArgs, expandHome } = require("./lib/args");

const { positional } = parseArgs();
const cwd = path.resolve(expandHome(positional[0] || process.cwd()));
if (!fs.existsSync(cwd)) {
  console.error(`폴더가 없습니다: ${cwd}`);
  process.exit(1);
}

const visibleEntries = fs.readdirSync(cwd).filter((e) => e !== ".DS_Store");
const has = (...p) => fs.existsSync(path.join(cwd, ...p));

const guidePath = path.join(cwd, "PROJECT_GUIDE.md");
const hasPlannerGuide = fs.existsSync(guidePath);
const plannerWorkspace = hasPlannerGuide && has("docs", "planning");

// 레벨: PROJECT_GUIDE.md의 "레벨 코드:" 줄을 우선, 없으면 문서 파일로 추정 (구버전 호환)
let detectedLevel = "";
if (hasPlannerGuide) {
  const m = fs.readFileSync(guidePath, "utf8").match(/레벨 코드:\s*(html|local-server|full)/);
  if (m) detectedLevel = m[1];
}
if (!detectedLevel) {
  if (has("docs", "planning", "DATA_MODEL.md")) detectedLevel = "full";
  else if (has("docs", "planning", "API_PLAN.md")) detectedLevel = "local-server";
  else if (has("docs", "planning", "ONE_PAGE_PLAN.md")) detectedLevel = "html";
}

const appMarkers = [
  "package.json", "pnpm-lock.yaml", "package-lock.json", "yarn.lock",
  "src", "app", "pages", "next.config.js", "next.config.ts", "next.config.mjs",
  ".next", ".git", "supabase", "prisma",
];
const foundMarkers = appMarkers.filter((m) => has(m));
const clean = visibleEntries.length === 0;
const likelyExistingProject = !plannerWorkspace && (foundMarkers.length > 0 || visibleEntries.length > 5);

// clean-workspace → 바로 진행 / continue-planner-workspace → 기존 문서 갱신
// confirm-before-writing → 쓰기 전 확인 / create-new-folder-and-rerun → 새 폴더 권장
let recommendation = "confirm-before-writing";
if (plannerWorkspace) recommendation = "continue-planner-workspace";
else if (clean) recommendation = "clean-workspace";
else if (likelyExistingProject) recommendation = "create-new-folder-and-rerun";

console.log(JSON.stringify({
  cwd,
  visibleEntryCount: visibleEntries.length,
  visibleEntries: visibleEntries.slice(0, 20),
  foundMarkers,
  plannerWorkspace,
  detectedLevel,
  clean,
  likelyExistingProject,
  recommendation,
}, null, 2));

#!/usr/bin/env node
// 기획 문서 검증. 사용: node validate_docs.js [프로젝트 루트] [--out docs/planning]
// 종료 코드: 0 = 통과(경고만 있을 수 있음), 1 = 오류 있음
const fs = require("fs");
const path = require("path");
const { parseArgs, str, expandHome } = require("./lib/args");

const { flags, positional } = parseArgs();
const root = path.resolve(expandHome(positional[0] || process.cwd()));
const errors = [];
const warnings = [];
const rel = (p) => path.relative(root, p) || ".";

const guide = path.join(root, "PROJECT_GUIDE.md");
if (!fs.existsSync(guide)) {
  console.log(JSON.stringify({ root, ok: false, errors: ["PROJECT_GUIDE.md가 없습니다."], warnings }, null, 2));
  process.exit(1);
}
const guideText = fs.readFileSync(guide, "utf8");

const levelMatch = guideText.match(/레벨 코드:\s*(html|local-server|full)/);
const level = levelMatch ? levelMatch[1] : "";
if (!level) errors.push("PROJECT_GUIDE.md에 '레벨 코드:' 줄이 없습니다.");

// 상세 문서 폴더: --out > PROJECT_GUIDE의 INTAKE_SUMMARY 링크 > docs/planning
const linkDir = (guideText.match(/\]\(([^)]*?)\/INTAKE_SUMMARY\.md\)/) || [])[1];
const planningDir = path.resolve(root, str(flags, "out", linkDir || "docs/planning"));

const REQUIRED = {
  html: ["INTAKE_SUMMARY.md", "ONE_PAGE_PLAN.md", "CHECKLIST.md", "PROMPTS.md"],
  "local-server": ["INTAKE_SUMMARY.md", "PRD.md", "API_PLAN.md", "PHASE_PLAN.md", "VALIDATION_HARNESS.md", "PROMPTS.md"],
  full: ["INTAKE_SUMMARY.md", "PRD.md", "MVP_SCOPE.md", "USER_FLOW.md", "DATA_MODEL.md", "PHASE_PLAN.md", "VALIDATION_HARNESS.md", "PROMPTS.md"],
};
for (const name of REQUIRED[level] || []) {
  if (!fs.existsSync(path.join(planningDir, name))) errors.push(`${rel(planningDir)}/${name} 가 없습니다.`);
}

if (fs.existsSync(path.join(planningDir, "_upgrade"))) {
  errors.push(`${rel(planningDir)}/_upgrade 폴더가 남아 있습니다. 병합을 끝내고 지우세요.`);
}

const docs = [guide, ...(fs.existsSync(planningDir)
  ? fs.readdirSync(planningDir).filter((f) => f.endsWith(".md")).map((f) => path.join(planningDir, f))
  : [])];

const HARNESS = ["목표:", "작업:", "완료 조건:", "검증 명령:", "브라우저 확인:", "다음 Phase 진입 조건:", "실패 시:"];

for (const file of docs) {
  const text = fs.readFileSync(file, "utf8");
  const name = rel(file);

  const leftover = text.match(/\{\{[A-Z_]+\}\}/g);
  if (leftover) errors.push(`${name}: 치환되지 않은 자리표시자 ${[...new Set(leftover)].join(", ")}`);

  const fillComments = (text.match(/<!--[\s\S]*?-->/g) || []).filter((c) => !/채우는 법|기술 스택:|Phase마다 하나/.test(c));
  if (fillComments.length) errors.push(`${name}: 채우지 않은 안내 주석 ${fillComments.length}개 (채운 뒤 주석을 지운다)`);

  if (/(앱 이름|아이디어|대상 사용자|해결할 문제) 미정/.test(text)) warnings.push(`${name}: '미정' 기본값이 남아 있습니다.`);

  for (const [, target] of text.matchAll(/\]\(([^)#\s]+\.md)\)/g)) {
    if (/^https?:/.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), target))) errors.push(`${name}: 깨진 링크 ${target}`);
  }

  if (path.basename(file) === "PHASE_PLAN.md") {
    for (const section of text.split(/^(?=## Phase )/m).filter((s) => s.startsWith("## Phase "))) {
      const title = section.split("\n")[0].replace(/^## /, "");
      if (/건너뜀/.test(section)) continue;
      const missing = HARNESS.filter((h) => !section.includes(h));
      if (missing.length) errors.push(`${name} ${title}: 하네스 항목 누락 ${missing.join(", ")}`);
    }
  }
}

const nextTask = (guideText.match(/^- 다음 작업:(.*)$/m) || [])[1];
if (nextTask !== undefined && nextTask.replace(/<!--[\s\S]*?-->/g, "").trim() === "") {
  errors.push("PROJECT_GUIDE.md: '다음 작업'이 비어 있습니다.");
}

const ok = errors.length === 0;
console.log(JSON.stringify({ root, level, planningDir: rel(planningDir), ok, errors, warnings }, null, 2));
process.exit(ok ? 0 : 1);

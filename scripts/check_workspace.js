#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const cwd = process.cwd();
const entries = fs.readdirSync(cwd);
const ignored = new Set([".DS_Store"]);
const visibleEntries = entries.filter((entry) => !ignored.has(entry));

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

const hasPlannerGuide = fs.existsSync(path.join(cwd, "PROJECT_GUIDE.md"));
const hasPlanningDir = fs.existsSync(path.join(cwd, "docs", "planning"));
const hasOneHtmlPlan = fs.existsSync(path.join(cwd, "docs", "planning", "ONE_PAGE_PLAN.md"));
const hasLocalServerPlan = fs.existsSync(path.join(cwd, "docs", "planning", "API_PLAN.md"));
const hasFullPlan = fs.existsSync(path.join(cwd, "docs", "planning", "DATA_MODEL.md"));
const plannerWorkspace = hasPlannerGuide && hasPlanningDir;

let detectedLevel = "";
if (hasFullPlan) {
  detectedLevel = "full";
} else if (hasLocalServerPlan) {
  detectedLevel = "local-server";
} else if (hasOneHtmlPlan) {
  detectedLevel = "html";
}

const appMarkers = [
  "package.json",
  "pnpm-lock.yaml",
  "package-lock.json",
  "yarn.lock",
  "src",
  "app",
  "pages",
  "next.config.js",
  "next.config.ts",
  ".next",
  ".git",
  "supabase",
  "prisma",
];

const foundMarkers = appMarkers.filter((marker) => fs.existsSync(path.join(cwd, marker)));
const clean = visibleEntries.length === 0;
const likelyExistingProject = !plannerWorkspace && (foundMarkers.length > 0 || visibleEntries.length > 5);

let recommendation = "confirm-before-writing";

if (plannerWorkspace) {
  recommendation = "continue-planner-workspace";
} else if (clean) {
  recommendation = "clean-workspace";
} else if (likelyExistingProject) {
  recommendation = "create-new-folder-and-rerun";
}

const desktopDir = path.join(os.homedir(), "Desktop");
const suggestedWorkspaceName = `vibe-app-plan-${timestamp()}`;
const suggestedWorkspacePath = path.join(desktopDir, suggestedWorkspaceName);
const createWorkspaceCommand = "node ~/.claude/skills/GQAI-vibe-planner/scripts/create_workspace.js";

console.log(JSON.stringify({
  cwd,
  visibleEntryCount: visibleEntries.length,
  visibleEntries: visibleEntries.slice(0, 20),
  foundMarkers,
  plannerWorkspace,
  hasPlannerGuide,
  hasPlanningDir,
  detectedLevel,
  clean,
  likelyExistingProject,
  recommendation,
  suggestedWorkspacePath,
  createWorkspaceCommand,
}, null, 2));

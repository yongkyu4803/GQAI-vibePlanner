#!/bin/bash
# GQAI-vibe-planner를 ~/.claude/skills/에 설치하는 스크립트

PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$HOME/.claude/skills/GQAI-vibe-planner"

echo "📦 GQAI-vibe-planner 설치 중..."
echo "   소스: $PLUGIN_DIR"
echo "   대상: $SKILLS_DIR"

rm -rf "$SKILLS_DIR"
mkdir -p "$SKILLS_DIR"

cp -r "$PLUGIN_DIR/.claude-plugin" "$SKILLS_DIR/"
cp -r "$PLUGIN_DIR/commands"       "$SKILLS_DIR/"
cp -r "$PLUGIN_DIR/scripts"        "$SKILLS_DIR/"
cp -r "$PLUGIN_DIR/assets"         "$SKILLS_DIR/"

echo ""
echo "✅ 설치 완료!"
echo "   Claude Code를 재시작하거나 /reload-plugins 를 실행하세요."
echo "   사용 방법: /GQAI:vibe-planner"

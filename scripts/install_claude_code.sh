#!/bin/bash
# GQAI-vibe-planner를 ~/.claude/skills/ 에 설치한다. 소스 폴더(압축 푼 위치 등)에서 실행한다.
set -euo pipefail

PLUGIN_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"
SKILLS_DIR="$HOME/.claude/skills/GQAI-vibe-planner"

if [ -d "$SKILLS_DIR" ] && [ "$PLUGIN_DIR" = "$(cd "$SKILLS_DIR" && pwd -P)" ]; then
  echo "이미 설치된 위치에서 실행했습니다. 설치할 것이 없습니다: $SKILLS_DIR"
  echo "   업데이트하려면 소스 저장소 폴더의 scripts/install_claude_code.sh 를 실행하세요."
  exit 0
fi

echo "📦 GQAI-vibe-planner 설치 중..."
echo "   소스: $PLUGIN_DIR"
echo "   대상: $SKILLS_DIR"

# 새 버전을 임시 폴더에 먼저 복사하고, 성공하면 교체한다. (중간에 실패해도 기존 설치가 남는다)
STAGE="$(mktemp -d "$HOME/.claude/skills/.GQAI-vibe-planner.XXXXXX")"
trap 'rm -rf "$STAGE"' EXIT
for d in .claude-plugin commands scripts assets tests; do
  [ -e "$PLUGIN_DIR/$d" ] && cp -R "$PLUGIN_DIR/$d" "$STAGE/"
done

if [ -d "$SKILLS_DIR" ]; then
  BACKUP="$HOME/.claude/backups/GQAI-vibe-planner-$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$(dirname "$BACKUP")"
  mv "$SKILLS_DIR" "$BACKUP"
  echo "   기존 설치 백업: $BACKUP"
fi
mv "$STAGE" "$SKILLS_DIR"
trap - EXIT

# 소스 경로 저장 (update_check.sh 자동 업데이트에서 사용)
echo "$PLUGIN_DIR" > "$HOME/.claude/.gqai-vibe-planner_source_path"

echo ""
echo "✅ 설치 완료!"
echo "   Claude Code를 재시작하거나 /reload-plugins 를 실행하세요."
echo "   사용 방법: /GQAI-vibe-planner:vibe-planner"

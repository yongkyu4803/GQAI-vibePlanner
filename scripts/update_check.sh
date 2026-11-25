#!/bin/bash
# GitHub 최신 버전 확인 후, 새 버전이 있으면 소스 저장소를 pull하고 재설치한다.
# 실패해도 플래너 진행을 막지 않도록 항상 0으로 끝난다.
REPO="yongkyu4803/GQAI-vibePlanner"
PATH_FILE="$HOME/.claude/.gqai-vibe-planner_source_path"
SOURCE=""

# 1) 설치 때 저장한 소스 경로
if [ -f "$PATH_FILE" ]; then
  CANDIDATE="$(cat "$PATH_FILE")"
  [ -f "$CANDIDATE/.claude-plugin/plugin.json" ] && SOURCE="$CANDIDATE"
fi

# 2) 없으면 홈 폴더 1~2단계 아래에서 origin이 이 저장소인 git 폴더를 찾는다
if [ -z "$SOURCE" ]; then
  for dir in "$HOME"/*vibe*lanner* "$HOME"/*/*vibe*lanner* "$HOME"/*vibe_planner* "$HOME"/*/*vibe_planner*; do
    [ -d "$dir/.git" ] || continue
    if git -C "$dir" remote get-url origin 2>/dev/null | grep -q "$REPO"; then
      SOURCE="$dir"
      echo "$dir" > "$PATH_FILE"
      break
    fi
  done
fi

if [ -z "$SOURCE" ]; then
  echo "ℹ️  소스 경로를 찾을 수 없어 업데이트 확인을 건너뜁니다"
  exit 0
fi

read_ver() { python3 -c "import json,sys; print(json.load(sys.stdin)['version'])" 2>/dev/null; }
LOCAL_VER="$(read_ver < "$SOURCE/.claude-plugin/plugin.json")"
REMOTE_VER="$(curl -sf --max-time 5 "https://raw.githubusercontent.com/$REPO/main/.claude-plugin/plugin.json" | read_ver)"

if [ -z "$REMOTE_VER" ]; then
  echo "ℹ️  업데이트 확인 실패 (네트워크). 계속 진행합니다"
elif [ "$LOCAL_VER" = "$REMOTE_VER" ]; then
  echo "✅ GQAI-vibe-planner v$LOCAL_VER (최신)"
elif [ -n "$(git -C "$SOURCE" status --porcelain --untracked-files=no 2>/dev/null)" ]; then
  echo "⚠️  새 버전 v$REMOTE_VER 이 있지만 소스 폴더에 커밋하지 않은 변경이 있어 건너뜁니다: $SOURCE"
else
  echo "⬆️  새 버전 발견: ${LOCAL_VER:-없음} → $REMOTE_VER — 업데이트 중..."
  if git -C "$SOURCE" pull --ff-only origin main --quiet && bash "$SOURCE/scripts/install_claude_code.sh" >/dev/null; then
    echo "✅ v$REMOTE_VER 업데이트 완료. 이번 실행은 기존 안내문으로 진행되니, 끝나면 /reload-plugins 를 해 주세요."
  else
    echo "⚠️  업데이트 실패. 수동: cd \"$SOURCE\" && git pull && bash scripts/install_claude_code.sh"
  fi
fi
exit 0

#!/bin/bash
# 스크립트 스모크 테스트. 임시 폴더에서만 쓴다. 사용: bash tests/smoke.sh
set -uo pipefail
S="$(cd "$(dirname "$0")/.." && pwd)/scripts"
T="$(mktemp -d)"; trap 'rm -rf "$T"' EXIT
fail=0
check() { if eval "$2"; then echo "  ✅ $1"; else echo "  ❌ $1"; fail=1; fi; }

echo "[1] 레벨별 생성 파일"
for lv in html local-server full; do
  mkdir -p "$T/$lv"
  node "$S/create_planning_docs.js" --level $lv --root "$T/$lv" --app-name A --idea I --audience U --problem P >/dev/null
done
check "html 5개" '[ $(find "$T/html" -type f | wc -l) -eq 5 ]'
check "local-server 7개" '[ $(find "$T/local-server" -type f | wc -l) -eq 7 ]'
check "full 9개" '[ $(find "$T/full" -type f | wc -l) -eq 9 ]'
check "앱 코드 생성 안 함" '! find "$T" -name "*.js" -o -name package.json | grep -q .'
check "자리표시자 없음" '! grep -rq "{{[A-Z_]*}}" "$T"'

echo "[2] 옵션 처리"
mkdir -p "$T/q"
node "$S/create_planning_docs.js" --level local-server --root "$T/q" --app-name 'Mom"s <app>' --idea >/dev/null
check "따옴표 이름 그대로" 'grep -q "Mom\"s <app>" "$T/q/PROJECT_GUIDE.md"'
check "빈 --idea는 기본값" 'grep -q "아이디어 미정" "$T/q/PROJECT_GUIDE.md"'
mkdir -p "$T/o"
node "$S/create_planning_docs.js" --level html --root "$T/o" --out plans >/dev/null
check "--out 적용" '[ -f "$T/o/plans/ONE_PAGE_PLAN.md" ] && [ ! -d "$T/o/docs" ]'
check "--out 링크 반영" 'grep -q "](plans/ONE_PAGE_PLAN.md)" "$T/o/PROJECT_GUIDE.md"'

echo "[3] 작업 폴더 점검"
mkdir -p "$T/empty"
check "빈 폴더 → clean-workspace" 'node "$S/check_workspace.js" "$T/empty" | grep -q "\"clean-workspace\""'
check "플래너 폴더 → continue + 레벨" 'node "$S/check_workspace.js" "$T/full" | grep -q "\"detectedLevel\": \"full\""'

echo "[4] 검증 스크립트"
check "막 생성한 문서는 실패" '! node "$S/validate_docs.js" "$T/full" >/dev/null'
check "다음 작업 누락 감지" '{ node "$S/validate_docs.js" "$T/full" || true; } | grep -q "다음 작업"'
check "안내 주석 남으면 오류" '{ node "$S/validate_docs.js" "$T/full" || true; } | grep -q "채우지 않은 안내 주석"'
# 채운 것처럼 만들기: 다음 작업 기입 + 작성 지침 주석 제거 (채우는 법/기술 스택/Phase마다 하나 주석은 남김)
sed -i '' 's/^- 다음 작업: .*/- 다음 작업: 랜딩 화면 만들기/' "$T/full/PROJECT_GUIDE.md"
find "$T/full" -name "*.md" -exec perl -0pi -e 's/<!--(?:(?!채우는 법|기술 스택:|Phase마다 하나)(?:(?!-->).))*?-->//gs' {} +
check "채우고 나면 통과" 'node "$S/validate_docs.js" "$T/full" >/dev/null'
check "치환 안 된 자리표시자 감지" 'echo "{{FOO}}" >> "$T/full/docs/planning/PRD.md"; { node "$S/validate_docs.js" "$T/full" || true; } | grep -q "FOO"' 

echo "[5] 레벨 올리기"
out=$(node "$S/create_planning_docs.js" --level local-server --root "$T/html" --upgrade)
check "기존 파일 보존" 'grep -q "레벨 코드: html" "$T/html/PROJECT_GUIDE.md"'
check "병합 대상 표시" 'echo "$out" | grep -q "_upgrade/local-server/PROJECT_GUIDE.md"'
check "새 문서 추가" '[ -f "$T/html/docs/planning/API_PLAN.md" ]'
check "_upgrade 남으면 검증 실패" '{ node "$S/validate_docs.js" "$T/html" || true; } | grep -q "_upgrade"'

[ $fail -eq 0 ] && echo "모두 통과" || { echo "실패 있음"; exit 1; }

# Phase Plan: {{APP_NAME}}

## Phase 0. Planning Lock

- [ ] `PROJECT_GUIDE.md` 확인
- [ ] Level 2 범위 확인
- [ ] DB/로그인 제외 확인

## Phase 1. Static Public UI

목표:
- `public/index.html`, `public/styles.css`, `public/app.js`로 화면을 만든다.

검증:
```bash
npm run dev
curl -I http://localhost:3000/
```

## Phase 2. Local API

목표:
- `server.js`에 `/api/plan`을 만든다.

검증:
```bash
curl -s http://localhost:3000/api/plan \
  -H "Content-Type: application/json" \
  -d '{"idea":"테스트","audience":"초보자","problem":"범위가 커짐"}'
```

## Phase 3. Core Workflow

목표:
- 화면 입력을 API와 연결하고 결과를 보여준다.

검증:
- 브라우저에서 입력 후 결과가 보인다.
- API 실패 시 쉬운 오류 메시지가 보인다.

## Phase 4. Polish

목표:
- 모바일, 빈 상태, 오류 상태를 다듬는다.

검증:
- 모바일 폭에서 텍스트가 겹치지 않는다.

## Phase 5. Runbook

목표:
- 실행 방법과 다음 개선 후보를 정리한다.

검증:
- `npm install`, `npm run dev`로 재현 가능하다.

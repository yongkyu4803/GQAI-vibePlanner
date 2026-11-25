# Phase Plan: {{APP_NAME}}

<!-- 채우는 법: 모든 Phase에 목표 / 작업 / 완료 조건 / 검증 명령 / 브라우저 확인 / 다음 Phase 진입 조건 / 실패 시 7항목을 둔다.
     기본 순서가 앱에 맞지 않으면 바꿔도 된다. 엔드포인트 경로는 API_PLAN.md와 맞춘다. -->

## Phase 1. Static Public UI

목표:
- `package.json`, `server.js`(정적 파일 제공만), `public/index.html`, `public/styles.css`, `public/app.js`로 화면을 만든다.

작업:
- [ ] Express 설치와 `npm run dev` 스크립트
- [ ] 입력·결과 화면 (가짜 데이터)

완료 조건:
- `npm run dev` 후 화면이 열린다.

검증 명령:
```bash
npm install
npm run dev
curl -I http://localhost:3000/
```

브라우저 확인:
- [ ] http://localhost:3000 에서 화면이 보인다.

다음 Phase 진입 조건:
- 화면 구성에 사용자가 동의했다.

실패 시:
- 포트 충돌이면 `PORT=3001 npm run dev`로 다시 시도한다.

## Phase 2. Local API

목표:
- API_PLAN.md의 엔드포인트 하나를 `server.js`에 만든다.

작업:
- [ ] 요청 검증 (입력 누락 시 400)
- [ ] 응답 형식을 API_PLAN.md와 맞춤

완료 조건:
- curl로 정상 응답과 400 오류를 모두 확인했다.

검증 명령:
```bash
curl -s http://localhost:3000/api/<경로> -H "Content-Type: application/json" -d '{}'
```

브라우저 확인:
- 해당 없음 (API만)

다음 Phase 진입 조건:
- 응답 형식이 API_PLAN.md와 같다.

실패 시:
- 서버 터미널의 오류 메시지를 그대로 복사해 Claude에게 붙여넣는다.

## Phase 3. Core Workflow

목표:
- 화면 입력을 API와 연결하고 결과를 보여준다.

작업:
- [ ] `public/app.js`에서 fetch 연결
- [ ] 로딩 / 성공 / 오류 상태
- [ ] 사용자 입력은 `textContent`로 표시

완료 조건:
- 사용자가 MVP 핵심 행동을 한 번 끝까지 할 수 있다.

검증 명령:
```bash
npm run dev
```

브라우저 확인:
- [ ] 입력 후 결과가 보인다.
- [ ] 서버를 끄고 시도하면 쉬운 오류 문구가 보인다.

다음 Phase 진입 조건:
- 핵심 행동이 가짜 데이터 없이 동작한다.

실패 시:
- 브라우저 개발자 도구 Console의 빨간 오류를 복사해 붙여넣는다.

## Phase 4. Polish

목표:
- 모바일, 빈 상태, 오류 상태를 다듬는다.

작업:
- [ ] 모바일 폭 레이아웃
- [ ] 빈 입력 안내 문구

완료 조건:
- VALIDATION_HARNESS.md 항목이 모두 통과한다.

검증 명령:
```bash
npm run dev
```

브라우저 확인:
- [ ] 모바일 폭(390px)에서 글자가 겹치지 않는다.

다음 Phase 진입 조건:
- 사용자가 결과물을 확인했다.

실패 시:
- 깨진 화면을 캡처해 Claude에게 보여준다.

## Phase 5. Runbook

목표:
- 실행 방법과 다음 개선 후보를 정리한다.

작업:
- [ ] `README.md`에 설치·실행 방법
- [ ] 다음 개선 후보 3개 (DB·로그인이 필요해지면 full 레벨 업그레이드 검토)

완료 조건:
- 새 터미널에서 README만 보고 실행할 수 있다.

검증 명령:
```bash
npm install && npm run dev
```

브라우저 확인:
- [ ] README 순서대로 했을 때 화면이 열린다.

다음 Phase 진입 조건:
- 해당 없음 (마지막 Phase)

실패 시:
- 빠진 단계를 README에 추가한다.

# Codex Prompts: {{APP_NAME}}

## Phase 1 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Level 2 Local Server의 Phase 1만 진행해줘.
public/index.html, public/styles.css, public/app.js 화면만 다듬어줘.
복잡한 프레임워크, 외부 데이터 서비스, DB, 로그인은 만들지 마.
```

## Phase 2 Prompt

```txt
server.js에 /api/plan 하나만 구현해줘.
데이터 저장, 로그인, 외부 DB는 추가하지 마.
curl로 API 응답을 확인해줘.
```

## Phase 3 Prompt

```txt
public/app.js에서 입력 폼을 /api/plan과 연결해줘.
로딩, 성공, 오류 상태를 처리하고 브라우저에서 확인해줘.
```

## Phase 4 Prompt

```txt
모바일 레이아웃, 빈 상태, 오류 메시지만 다듬어줘.
새 프레임워크나 DB를 추가하지 마.
docs/planning/VALIDATION_HARNESS.md 기준으로 검증해줘.
```

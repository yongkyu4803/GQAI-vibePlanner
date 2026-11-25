# Prompts: {{APP_NAME}}

<!-- Phase마다 하나. 각 프롬프트는 ①PROJECT_GUIDE.md를 먼저 읽기 ②할 일 ③하지 말 것 ④읽을 문서 ⑤실행할 검증 을 담는다. -->

## Phase 1 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Level 2 Local Server의 Phase 1만 진행해줘.
package.json, server.js(정적 파일 제공만), public/index.html, styles.css, app.js로 화면을 만들어줘.
DB, 로그인, 복잡한 프레임워크는 만들지 마.
{{PLANNING_DIR}}/PHASE_PLAN.md의 Phase 1 검증을 실행하고 결과를 알려줘.
```

## Phase 2 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Phase 2만 진행해줘.
{{PLANNING_DIR}}/API_PLAN.md의 엔드포인트 하나만 server.js에 구현해줘.
데이터 저장, 로그인, 외부 DB는 추가하지 마.
curl로 정상 요청과 잘못된 요청을 둘 다 확인해줘.
```

## Phase 3 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Phase 3만 진행해줘.
public/app.js에서 화면을 API와 연결하고 로딩, 성공, 오류 상태를 처리해줘.
사용자 입력은 textContent로 표시해줘.
```

## Phase 4 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Phase 4만 진행해줘.
모바일 레이아웃, 빈 상태, 오류 문구만 다듬어줘. 새 프레임워크나 DB는 추가하지 마.
{{PLANNING_DIR}}/VALIDATION_HARNESS.md 기준으로 검증해줘.
```

## Phase 5 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 Phase 5만 진행해줘.
README.md에 설치·실행 방법과 다음 개선 후보 3개를 정리해줘.
```

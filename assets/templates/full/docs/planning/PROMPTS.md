# Prompts: {{APP_NAME}}

<!-- Phase마다 하나. 각 프롬프트는 ①PROJECT_GUIDE.md를 먼저 읽기 ②할 일 ③하지 말 것 ④읽을 문서 ⑤실행할 검증 을 담는다.
     필요 없는 Phase의 프롬프트는 "건너뜀"으로 바꾼다. 기본 스택이 아니면 /vibe:* 안내 줄을 지운다. -->

## Phase 0 Prompt

```txt
아래 문서들을 기준으로 기획을 먼저 확정해줘.
아직 코드는 만들지 말고, 모호한 요구사항과 MVP 범위 충돌만 정리해줘.

참고 문서:
- PROJECT_GUIDE.md
- {{PLANNING_DIR}}/INTAKE_SUMMARY.md
- {{PLANNING_DIR}}/PRD.md
- {{PLANNING_DIR}}/MVP_SCOPE.md
- {{PLANNING_DIR}}/USER_FLOW.md
- {{PLANNING_DIR}}/DATA_MODEL.md
- {{PLANNING_DIR}}/PHASE_PLAN.md
- {{PLANNING_DIR}}/VALIDATION_HARNESS.md

산출물:
- 미확정 질문
- MVP 범위 수정 제안
- Phase 1에서 할 일
```

## Phase 1 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 1 Static UI인지 확인해줘.
{{PLANNING_DIR}} 문서를 참고해서 Phase 1 Static UI만 구현해줘.
DB, Auth, 배포, analytics는 구현하지 마.
mock data로 랜딩/목록/상세 화면을 만들고, 완료 후 npm run lint와 npm run build를 실행해줘.
```

## Phase 2 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 2 Data Model인지 확인해줘.
Phase 2 Data Model만 진행해줘.
Supabase가 아직 연결되지 않았으면 먼저 /vibe:supabase-init 을 실행해줘.
UI 구조를 참고해 필요한 테이블, 필드, 관계, RLS 초안을 작성해줘.
아직 실제 Auth 구현이나 배포는 하지 마.
검증 가능한 SQL 또는 schema 문서를 만들고 위험한 권한 설정을 설명해줘.
```

## Phase 3 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 3 Core Workflow인지 확인해줘.
Phase 3 Core Workflow만 구현해줘.
사용자의 핵심 행동 하나를 end to end로 연결해줘.
성공, 빈 상태, 오류 상태를 모두 처리하고 npm run lint와 npm run build를 실행해줘.
```

## Phase 4 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 4 Auth and Permissions인지 확인해줘.
Phase 4 Auth and Permissions만 구현해줘.
로그인 뼈대가 없으면 먼저 /vibe:auth-setup 을 실행해줘.
공개 페이지와 보호 페이지를 분리하고, 로그인 성공 후 원래 경로로 돌아오게 해줘.
Supabase redirect URL과 RLS 검증 체크리스트를 함께 확인해줘.
```

## Phase 5 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 5 Deployment인지 확인해줘.
Phase 5 Deployment만 진행해줘.
아직 배포한 적이 없으면 /vibe:deploy-vercel 로 시작해줘.
Vercel 환경변수, build command, production URL, Supabase callback URL을 확인해줘.
배포 후 curl -I로 공개/보호 경로의 응답을 확인해줘.
```

## Phase 6 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 6 Operations인지 확인해줘.
Phase 6 Operations만 진행해줘.
analytics, 신규 가입자 조회, 주요 경로 응답 확인, 릴리즈 노트 작성을 설정해줘.
운영 상태를 초보자가 읽을 수 있는 점검표로 정리해줘.
```

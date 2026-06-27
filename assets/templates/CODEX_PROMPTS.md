# Codex Prompts: {{APP_NAME}}

## Phase 0 Prompt

```txt
아래 문서들을 기준으로 기획을 먼저 확정해줘.
아직 코드는 만들지 말고, 모호한 요구사항과 MVP 범위 충돌만 정리해줘.
현재 폴더가 기존 플래너 작업 폴더이면 이어서 진행해줘.
기존 플래너 작업 폴더가 아니고 새 작업 폴더도 아니면 문서 생성을 중단하고, 새 폴더를 만든 뒤 그곳에서 다시 시작하라고 안내해줘.

참고 문서:
- PROJECT_GUIDE.md
- docs/planning/INTAKE_SUMMARY.md
- docs/planning/PRD.md
- docs/planning/MVP_SCOPE.md
- docs/planning/USER_FLOW.md
- docs/planning/DATA_MODEL.md
- docs/planning/PHASE_PLAN.md
- docs/planning/VALIDATION_HARNESS.md

산출물:
- 미확정 질문
- MVP 범위 수정 제안
- Phase 1에서 할 일
```

## Phase 1 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 1 Static UI인지 확인해줘.
docs/planning 문서를 참고해서 Phase 1 Static UI만 구현해줘.
DB, Auth, 배포, analytics는 구현하지 마.
mock data로 랜딩/목록/상세 화면을 만들고, 완료 후 npm run lint와 npm run build를 실행해줘.
```

## Phase 2 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 2 Data Model인지 확인해줘.
Phase 2 Data Model만 진행해줘.
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
공개 페이지와 보호 페이지를 분리하고, 로그인 성공 후 원래 경로로 돌아오게 해줘.
Supabase redirect URL과 RLS 검증 체크리스트를 함께 확인해줘.
```

## Phase 5 Prompt

```txt
PROJECT_GUIDE.md를 먼저 읽고 "다음 실행 Phase"가 Phase 5 Deployment인지 확인해줘.
Phase 5 Deployment만 진행해줘.
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

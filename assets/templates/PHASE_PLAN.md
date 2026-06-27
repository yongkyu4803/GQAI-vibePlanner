# Phase Plan: {{APP_NAME}}

## Phase 0. Planning Lock

목표:
- PRD, MVP 범위, 사용자 흐름, 하네스를 확정한다.

작업:
- [ ] 새 작업 폴더 확인
- [ ] 루트 `PROJECT_GUIDE.md` 확인
- [ ] INTAKE_SUMMARY 확인
- [ ] PRD 확인
- [ ] MVP 포함/제외 범위 확인
- [ ] 페이즈별 완료 조건 확인

완료 조건:
- 루트 `PROJECT_GUIDE.md`와 상세 기획 문서가 `docs/planning`에 저장되어 있다.
- 다음 세션에서 Phase 1만 실행할 수 있다.

검증:
- [ ] 루트 `PROJECT_GUIDE.md`가 존재한다.
- [ ] 상세 문서 8개가 `docs/planning`에 존재한다.
- [ ] `INTAKE_SUMMARY.md`에 작업 폴더 확인 결과가 적혀 있다.

다음 페이즈 진입 조건:
- 미확정 질문이 Phase 1 구현을 막지 않아야 한다.

## Phase 1. Static UI

목표:
- 실제 데이터 없이 화면 구조와 핵심 동선을 만든다.

작업:
- [ ] 랜딩/목록/상세 화면 구현
- [ ] mock data 작성
- [ ] 모바일 레이아웃 확인

완료 조건:
- 주요 화면이 브라우저에서 열린다.
- DB/Auth 없이도 UI를 확인할 수 있다.

검증:
```bash
npm run lint
npm run build
```

다음 페이즈 진입 조건:
- UI 경로와 컴포넌트 구조가 확정되어야 한다.

## Phase 2. Data Model

목표:
- 필요한 데이터 구조와 저장 규칙을 확정한다.

작업:
- [ ] 테이블/필드 확정
- [ ] RLS 정책 초안 작성
- [ ] seed 또는 sample data 준비

완료 조건:
- 데이터 없이 임시로 만든 UI가 실제 데이터 구조로 교체 가능하다.

검증:
- [ ] SQL 또는 schema 문서 리뷰
- [ ] 개인정보/권한 범위 리뷰

다음 페이즈 진입 조건:
- core workflow에 필요한 데이터가 빠지지 않아야 한다.

## Phase 3. Core Workflow

목표:
- 사용자의 가장 중요한 행동을 end to end로 구현한다.

작업:
- [ ] 생성/조회/수정 중 MVP에 필요한 흐름 구현
- [ ] empty/error/success 상태 처리

완료 조건:
- 사용자가 MVP 핵심 행동을 한 번 완료할 수 있다.

검증:
```bash
npm run lint
npm run build
```

다음 페이즈 진입 조건:
- 핵심 흐름이 mock이 아닌 실제 상태로 작동해야 한다.

## Phase 4. Auth and Permissions

목표:
- 공개 페이지와 보호 페이지를 분리하고 사용자별 권한을 적용한다.

작업:
- [ ] 로그인 페이지
- [ ] 보호 라우트
- [ ] 로그인 후 원래 경로 복귀
- [ ] 로그아웃
- [ ] RLS 검증

완료 조건:
- 미로그인 사용자는 보호 상세 페이지를 읽을 수 없다.

검증:
- [ ] 공개 랜딩 200
- [ ] 보호 상세 `/login?next=...` 리다이렉트
- [ ] 로그인 후 원래 페이지 복귀
- [ ] 로그아웃 후 재접근 차단

다음 페이즈 진입 조건:
- redirect loop가 없어야 한다.

## Phase 5. Deployment

목표:
- 운영 URL에서 MVP를 사용할 수 있게 한다.

작업:
- [ ] Vercel env 설정
- [ ] build command 확인
- [ ] Supabase redirect URL 확인
- [ ] production URL smoke test

완료 조건:
- 운영 URL에서 공개/보호 흐름이 모두 정상이다.

검증:
```bash
npm run build
curl -I https://example.com
```

다음 페이즈 진입 조건:
- 운영 500 오류가 없어야 한다.

## Phase 6. Operations

목표:
- 출시 후 상태를 확인할 수 있게 한다.

작업:
- [ ] analytics 연결
- [ ] 신규 가입자 조회
- [ ] 주요 경로 200/307 확인
- [ ] 릴리즈 노트 작성

완료 조건:
- 방문자, 가입자, 운영 오류를 확인할 방법이 있다.

검증:
- [ ] Vercel Analytics 확인
- [ ] Supabase 신규 가입자 조회
- [ ] 주요 URL 응답 확인

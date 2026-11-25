# Project Guide: {{APP_NAME}}

작성일: {{DATE}}

이 문서는 개발의 출발점입니다. Claude Code로 개발을 이어갈 때 이 문서를 먼저 읽습니다.

## 레벨

- 레벨 코드: full
- {{LEVEL_LABEL}}
- 기술 스택: {{STACK}}

## 프로젝트 한 줄 설명

{{IDEA}}

## 대상 사용자

{{AUDIENCE}}

## 해결할 문제

{{PROBLEM}}

## 현재 작업 폴더

- 프로젝트 루트: {{PROJECT_ROOT}}
- 새 작업 폴더 확인: <!-- 예 / 아니오 중 하나로 채운다 -->

## 개발 원칙

- 한 번에 하나의 Phase만 진행한다.
- Phase 완료 전에는 다음 Phase 구현을 시작하지 않는다.
- MVP 범위 밖 기능은 구현하지 않고 `{{PLANNING_DIR}}/MVP_SCOPE.md`에 기록한다.
- 구현 후에는 해당 Phase의 검증 명령과 브라우저 확인을 실행한다.
- 기획이 바뀌면 이 문서와 `{{PLANNING_DIR}}` 문서를 함께 업데이트한다.

## Phase 상태

- 다음 실행 Phase: Phase 1. Static UI
- 다음 작업: <!-- Phase 1에서 만들 화면을 한 줄로 -->
- 완료 조건: <!-- PHASE_PLAN.md의 Phase 1 완료 조건 요약 -->
- 차단 사항: 없음

## 참고 문서

- [Intake Summary]({{PLANNING_DIR}}/INTAKE_SUMMARY.md)
- [PRD]({{PLANNING_DIR}}/PRD.md)
- [MVP Scope]({{PLANNING_DIR}}/MVP_SCOPE.md)
- [User Flow]({{PLANNING_DIR}}/USER_FLOW.md)
- [Data Model]({{PLANNING_DIR}}/DATA_MODEL.md)
- [Phase Plan]({{PLANNING_DIR}}/PHASE_PLAN.md)
- [Validation Harness]({{PLANNING_DIR}}/VALIDATION_HARNESS.md)
- [Prompts]({{PLANNING_DIR}}/PROMPTS.md)

## 레벨 변경 기록

| 날짜 | 변경 | 이유 |
| --- | --- | --- |
| {{DATE}} | full로 시작 | 최초 기획 |

## 다음 단계

```txt
PROJECT_GUIDE.md를 먼저 읽고, {{PLANNING_DIR}} 문서들을 참고해서 다음 실행 Phase만 진행해줘.
MVP 범위 밖 기능은 구현하지 말고, 완료 후 검증 결과를 정리해줘.
```

기본 스택(Next.js + Supabase + Vercel)이면 각 Phase 전에 아래 스킬로 뼈대를 먼저 깔 수 있습니다.

| Phase | 먼저 실행 | 하는 일 |
| --- | --- | --- |
| 1. Static UI | `/vibe:nextjs-init` | Next.js 프로젝트 생성 (기존 기획 문서는 그대로 둠) |
| 1 완료 후 | `/vibe:git-flow` | GitHub 백업 |
| 2. Data Model | `/vibe:supabase-init` | Supabase 연결 |
| 4. Auth | `/vibe:auth-setup` | 로그인/회원가입 |
| 5. Deployment | `/vibe:deploy-vercel` | 배포와 공유 URL |

진행 상황이 헷갈리면 `/vibe:start`로 지금 할 일 하나를 확인합니다.

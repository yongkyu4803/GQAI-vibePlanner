# Project Guide: {{APP_NAME}}

작성일: {{DATE}}

이 문서는 프로젝트 루트의 기본 개발 가이드입니다. Codex, Claude Code, ChatGPT 등으로 개발을 이어갈 때 먼저 이 문서를 읽고 진행합니다.

## 1. 프로젝트 한 줄 설명

{{IDEA}}

## 2. 대상 사용자

{{AUDIENCE}}

## 3. 해결할 문제

{{PROBLEM}}

## 4. 현재 작업 폴더

- 프로젝트 루트: {{PROJECT_ROOT}}
- 새 작업 폴더 확인: 예 / 아니오 / 확인 필요
- 메모:

## 5. 개발 원칙

- 한 번에 하나의 Phase만 진행한다.
- Phase 완료 전에는 다음 Phase 구현을 시작하지 않는다.
- MVP 범위 밖 기능은 구현하지 않고 `docs/planning/MVP_SCOPE.md`에 기록한다.
- 구현 후에는 해당 Phase의 검증 명령과 브라우저 체크를 실행한다.
- 기획이 바뀌면 이 문서와 `docs/planning` 문서를 함께 업데이트한다.

## 6. Phase 상태

- 기획 상태: Phase 0. Planning Lock
- 다음 실행 Phase: Phase 1. Static UI
- 다음 작업:
- 완료 조건:
- 차단 사항:

## 7. 상세 기획 문서

- [Intake Summary](docs/planning/INTAKE_SUMMARY.md)
- [PRD](docs/planning/PRD.md)
- [MVP Scope](docs/planning/MVP_SCOPE.md)
- [User Flow](docs/planning/USER_FLOW.md)
- [Data Model](docs/planning/DATA_MODEL.md)
- [Phase Plan](docs/planning/PHASE_PLAN.md)
- [Validation Harness](docs/planning/VALIDATION_HARNESS.md)
- [Codex Prompts](docs/planning/CODEX_PROMPTS.md)

## 8. 개발 세션 시작 프롬프트

```txt
PROJECT_GUIDE.md를 먼저 읽고, docs/planning 문서들을 참고해서 다음 실행 Phase만 진행해줘.
MVP 범위 밖 기능은 구현하지 말고, 완료 후 검증 결과를 정리해줘.
```

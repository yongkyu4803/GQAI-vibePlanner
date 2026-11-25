# Project Guide: {{APP_NAME}}

작성일: {{DATE}}

이 문서는 개발의 출발점입니다. Claude Code로 개발을 이어갈 때 이 문서를 먼저 읽습니다.

## 레벨

- 레벨 코드: local-server
- {{LEVEL_LABEL}}
- 실행 방식: `npm install` 후 `npm run dev`
- 사용하지 않는 것: 데이터베이스, 로그인, 결제, 복잡한 프레임워크

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

- Express 기반 `server.js`와 `public/*`만 사용한다. (Phase 1에서 처음 만든다)
- DB와 로그인은 만들지 않는다.
- API는 `/api/...` 하나부터 시작한다.
- AI API 키가 필요하면 서버 환경변수에서만 읽는다.
- 사용자 입력을 화면에 넣을 때는 `textContent`를 쓴다. (`innerHTML` 금지)

## Phase 상태

- 다음 실행 Phase: Phase 1. Static Public UI
- 다음 작업: <!-- Phase 1에서 만들 화면을 한 줄로 -->
- 완료 조건: <!-- PHASE_PLAN.md의 Phase 1 완료 조건 요약 -->
- 차단 사항: 없음

## 참고 문서

- [Intake Summary]({{PLANNING_DIR}}/INTAKE_SUMMARY.md)
- [PRD]({{PLANNING_DIR}}/PRD.md)
- [API Plan]({{PLANNING_DIR}}/API_PLAN.md)
- [Phase Plan]({{PLANNING_DIR}}/PHASE_PLAN.md)
- [Validation Harness]({{PLANNING_DIR}}/VALIDATION_HARNESS.md)
- [Prompts]({{PLANNING_DIR}}/PROMPTS.md)

## 레벨 변경 기록

| 날짜 | 변경 | 이유 |
| --- | --- | --- |
| {{DATE}} | local-server로 시작 | 최초 기획 |

## 다음 단계

```txt
PROJECT_GUIDE.md를 먼저 읽고 Level 2 Local Server 범위의 다음 실행 Phase만 진행해줘.
Express server.js와 public 파일만 사용하고, DB/로그인/복잡한 프레임워크는 만들지 마.
```

코드를 처음 만든 뒤에는 `/vibe:git-flow`로 GitHub에 백업하는 것을 권장합니다.

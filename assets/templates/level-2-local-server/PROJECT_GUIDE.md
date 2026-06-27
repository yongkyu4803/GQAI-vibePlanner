# Project Guide: {{APP_NAME}}

작성일: {{DATE}}

## 레벨

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
- 새 작업 폴더 확인: 예 / 아니오 / 확인 필요

## 개발 원칙

- Express 기반 `server.js`와 `public/*`만 사용한다.
- DB와 로그인은 만들지 않는다.
- API가 필요하면 `/api/...` 하나부터 시작한다.
- AI API 키가 필요하면 서버 환경변수에서만 읽는다.
- 복잡한 프레임워크나 외부 데이터 서비스는 추가하지 않는다.

## 다음 실행 Phase

- Phase 1. Static Public UI

## 참고 문서

- [PRD](docs/planning/PRD.md)
- [API Plan](docs/planning/API_PLAN.md)
- [Phase Plan](docs/planning/PHASE_PLAN.md)
- [Validation Harness](docs/planning/VALIDATION_HARNESS.md)
- [Codex Prompts](docs/planning/CODEX_PROMPTS.md)

## 개발 세션 시작 프롬프트

```txt
PROJECT_GUIDE.md를 먼저 읽고 Level 2 Local Server 범위만 진행해줘.
Express server.js와 public 파일만 사용하고, 복잡한 프레임워크/외부 데이터 서비스/DB/로그인은 만들지 마.
```

# Project Guide: {{APP_NAME}}

작성일: {{DATE}}

## 레벨

- {{LEVEL_LABEL}}
- 실행 방식: `index.html`을 브라우저에서 열기
- 사용하지 않는 것: 서버, npm, 데이터베이스, 로그인, 외부 API

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

- `index.html` 하나만 만든다.
- CSS와 JavaScript는 `index.html` 내부에 둔다.
- 외부 라이브러리와 빌드 도구를 추가하지 않는다.
- 저장, 로그인, 서버, API는 만들지 않는다.
- 먼저 화면과 핵심 상호작용이 이해되는지 확인한다.

## 다음 실행 Phase

- Phase 1. One HTML Prototype

## 참고 문서

- [One Page Plan](docs/planning/ONE_PAGE_PLAN.md)
- [Checklist](docs/planning/CHECKLIST.md)
- [Codex Prompts](docs/planning/CODEX_PROMPTS.md)

## 개발 세션 시작 프롬프트

```txt
PROJECT_GUIDE.md를 먼저 읽고 Level 1 One HTML 범위만 진행해줘.
index.html 하나만 사용하고, 서버/npm/DB/로그인은 만들지 마.
```

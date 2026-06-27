# API Plan: {{APP_NAME}}

## API

| Method | Path | 역할 |
| --- | --- | --- |
| POST | `/api/plan` | 입력을 받아 계획 결과를 반환한다. |

## Request

```json
{
  "idea": "{{IDEA}}",
  "audience": "{{AUDIENCE}}",
  "problem": "{{PROBLEM}}"
}
```

## Response

```json
{
  "summary": "입력 요약",
  "mustHave": ["입력 화면", "계획 생성 API", "결과 표시"],
  "nonGoals": ["로그인", "데이터베이스", "결제"],
  "phases": ["Static Public UI", "Local API", "Core Workflow", "Polish", "Runbook"]
}
```

## 제한

- 사용자 데이터를 저장하지 않는다.
- 인증을 요구하지 않는다.
- AI 연결은 필요성이 확인된 뒤 서버 환경변수로만 추가한다.

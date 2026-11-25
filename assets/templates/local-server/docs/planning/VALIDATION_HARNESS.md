# Validation Harness: {{APP_NAME}}

## 실행 검증

```bash
npm install
npm run dev
```

## 화면 검증

```bash
curl -I http://localhost:3000/
```

- [ ] `/`가 200을 반환한다.
- [ ] MVP 핵심 행동의 입력 요소가 보인다.

## API 검증

<!-- API_PLAN.md의 엔드포인트마다 정상 요청 1개, 잘못된 요청 1개 -->

```bash
curl -s http://localhost:3000/api/<경로> -H "Content-Type: application/json" -d '{}'
```

- [ ] 정상 요청이 API_PLAN.md의 Response 형식으로 온다.
- [ ] 잘못된 요청이 400과 쉬운 문구를 돌려준다.

## 보안 검증

- [ ] API 키가 `public/` 파일에 없다.
- [ ] 사용자 입력을 `innerHTML`로 넣지 않는다.

## 금지 항목

- [ ] 복잡한 프레임워크를 추가하지 않았다.
- [ ] DB와 로그인 기능을 만들지 않았다.

## 페이즈 통과 규칙

- 검증 실패가 있으면 다음 Phase로 넘어가지 않는다.
- 실패 원인과 임시 우회는 PROJECT_GUIDE.md의 "차단 사항"에 적는다.

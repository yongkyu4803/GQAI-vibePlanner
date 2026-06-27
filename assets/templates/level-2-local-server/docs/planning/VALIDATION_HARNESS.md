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
- [ ] 입력 폼이 보인다.
- [ ] 계획 생성 버튼이 보인다.

## API 검증

```bash
curl -s http://localhost:3000/api/plan \
  -H "Content-Type: application/json" \
  -d '{"idea":"테스트 앱","audience":"초보자","problem":"개발 순서를 모름"}'
```

- [ ] `mustHave`가 있다.
- [ ] `nonGoals`가 있다.
- [ ] `phases`가 있다.

## 금지 항목

- [ ] 복잡한 프레임워크를 추가하지 않았다.
- [ ] 외부 데이터 서비스를 추가하지 않았다.
- [ ] DB와 로그인 기능을 만들지 않았다.

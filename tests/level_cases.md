# 레벨 추천 골든 케이스

플래너 안내문(3단계 레벨 결정)을 바꾼 뒤 이 케이스로 추천 결과가 그대로인지 확인한다.

| # | 아이디어 | 5번 답 요약 | 기대 레벨 | 경계 포인트 |
| --- | --- | --- | --- | --- |
| 1 | 회의 시간 타이머 | 전부 not needed | `html` | 저장 없음, 한 화면 |
| 2 | 체크리스트를 브라우저에 저장 | 저장은 "새로고침해도 남았으면" 정도 | `html` | localStorage는 DB가 아님 → html 유지 |
| 3 | 붙여넣은 글을 AI로 요약 | AI needed, 로그인·DB not needed | `local-server` | API 키를 브라우저에 둘 수 없음 → 서버 필요 |
| 4 | 엑셀 업로드 후 통계 표 | 파일 업로드 needed(저장 안 함), DB not needed | `local-server` | 업로드 처리만, 보관 없음 |
| 5 | 동아리 회원별 출석 기록 | 로그인 needed, DB needed | `full` | 사용자별 저장 데이터 |
| 6 | 아이디어 애매, 전부 unknown | unknown | `html` | 애매하면 가장 작은 레벨 |

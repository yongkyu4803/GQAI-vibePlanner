# Data Model: {{APP_NAME}}

## 저장해야 하는 정보

| 데이터 | 왜 필요한가 | 누가 소유하는가 | 공개 범위 |
| --- | --- | --- | --- |
|  |  | user / admin / public | private / public |

## 테이블 후보

| 테이블 | 주요 필드 | 관계 | RLS 필요 |
| --- | --- | --- | --- |
| profiles | id, email, full_name, created_at | auth.users와 1:1 | 예 |

## CRUD 정의

| 데이터 | 생성 | 조회 | 수정 | 삭제 |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Supabase RLS 초안

- 사용자 개인 데이터는 `auth.uid() = user_id` 기준으로 제한한다.
- 공개 콘텐츠는 select만 public으로 허용할 수 있다.
- service role은 서버 작업에만 사용하고 클라이언트에 노출하지 않는다.

## 미확정 데이터 질문

- 어떤 데이터가 사용자별로 분리되어야 하는가?
- 관리자가 전체 데이터를 봐야 하는가?
- 삭제 대신 보관이 필요한 데이터가 있는가?

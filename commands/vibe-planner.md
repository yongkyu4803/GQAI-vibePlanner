---
description: "초보 바이브코더의 아이디어를 적절한 크기의 프로젝트 계획으로 전환. 워크스페이스 확인 → 레벨 선택(HTML/로컬서버/풀) → 기획 문서 생성. PRD, 기획, MVP, 페이즈 계획, 하네스, 개발 프롬프트가 필요할 때 사용."
allowed-tools: [Bash, Read, AskUserQuestion]
---

# /GQAI:vibe-planner

## 규칙

이 커맨드를 사용하는 동안 구현을 시작하지 않는다. 워크스페이스를 확인하고, 프로젝트 레벨을 분류한 다음, 해당 레벨에 맞는 기획 문서만 생성한다.

---

## 워크스페이스 사전 점검 (Preflight)

5문항 인테이크를 시작하기 전에 반드시 실행한다. 워크스페이스가 확인되기 전까지 기획 문서를 작성하지 않는다.

1. 현재 폴더를 점검한다.

```bash
pwd
node ~/.claude/skills/GQAI-vibe-planner/scripts/check_workspace.js
```

2. 기존 앱/레포이거나, 관련 없는 파일이 있거나, `package.json`, `src/`, `app/`, `.next/`, `.git/`이 있거나, 이전 프로젝트처럼 보이면 **not clean**으로 처리한다.
3. `recommendation`이 `continue-planner-workspace`이면 현재 폴더에서 계속하고 기존 기획 문서를 업데이트한다.
4. `recommendation`이 `confirm-before-writing`이면 파일을 작성하기 전에 확인을 요청한다.
5. `recommendation`이 `create-new-folder-and-rerun`이면 플래너를 멈추고 아래 선택지를 제시한다.

```
지금 위치는 새 작업 폴더가 아닙니다.
선택지:
1. 바탕화면에 타임스탬프 새 폴더를 만들고 그곳에서 다시 시작
2. 직접 만든 새 폴더 경로를 알려주기
3. 현재 폴더에서 계속하기. 단, 기존 파일과 섞일 수 있음
```

6. 사용자가 바탕화면 타임스탬프 옵션을 선택하면 다음 명령을 실행한다.

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/create_workspace.js
```

반환된 `workspacePath`로 작업 컨텍스트를 이동하고, 5문항 인테이크부터 플래너를 다시 시작한다.

7. 확인된 워크스페이스 경로를 `PROJECT_GUIDE.md`와 `INTAKE_SUMMARY.md`에 저장한다.

---

## 시작 루틴

플래너가 시작되면 먼저 아래 5개 질문을 제시한다. 답변이 모두 나오기 전까지 PRD 작성을 시작하지 않는다.

```
1. 만들고 싶은 앱/서비스를 한 문장으로 설명하면 무엇인가요?
2. 이 앱을 가장 먼저 쓸 사람은 누구인가요?
3. 그 사용자가 지금 겪는 문제는 무엇이고, 현재는 어떻게 해결하고 있나요?
4. 첫 버전에서 반드시 가능해야 하는 핵심 행동은 무엇인가요? 최대 3개만 적어주세요.
5. 로그인, 데이터베이스, 파일 업로드, AI, 결제, 관리자, 배포 중 필요한 것은 무엇이고 아직 모르는 것은 무엇인가요?
```

아래 세 가지 인테이크 방식을 제공한다.

- **직접 답변**: 사용자가 현재 채팅에서 5개 질문에 직접 답변.
- **외부 AI 요약**: 사용자가 Claude, ChatGPT 등 다른 AI와 대화한 뒤 요약 결과를 붙여넣음.
- **문서 경로**: 사용자가 요약 대화가 담긴 로컬 파일 경로를 제공. 파일을 읽은 후 계속 진행. 파일을 읽을 수 없으면 요약을 붙여넣도록 요청.

외부 AI 사용 시 제공할 프롬프트:

```
나는 초보 바이브코더이고 앱 개발 전에 기획을 정리하고 싶어.
아래 5개 질문에 답을 만들 수 있게 나와 대화해줘.
마지막에는 Claude Code에 붙여넣을 수 있도록 "기획 입력 요약" 형식으로 정리해줘.

1. 만들고 싶은 앱/서비스를 한 문장으로 설명하면 무엇인가?
2. 이 앱을 가장 먼저 쓸 사람은 누구인가?
3. 그 사용자가 지금 겪는 문제는 무엇이고, 현재는 어떻게 해결하고 있는가?
4. 첫 버전에서 반드시 가능해야 하는 핵심 행동은 무엇인가? 최대 3개.
5. 로그인, 데이터베이스, 파일 업로드, AI, 결제, 관리자, 배포 중 필요한 것은 무엇이고 아직 모르는 것은 무엇인가?
```

붙여넣은 텍스트나 문서를 받은 후, 결정사항·가정·미결 질문·리스크를 추출한다. 범위 축소(scope cut)로 넘어가기 전에 인테이크를 요약한다.

---

## 레벨 결정

아이디어를 검증할 수 있는 가장 작은 레벨을 선택한다.

| 레벨 | 사용 조건 | 기본 산출물 |
| --- | --- | --- |
| `html` | 화면 전용 프로토타입, 서버 없음, API 없음, 저장 데이터 없음 | `index.html` + 짧은 기획 문서 3개 |
| `local-server` | 단순 API, 로컬 처리, 선택적 서버사이드 AI 호출, DB/로그인 불필요 | `server.js`, `public/*` + 기획 문서 5개 |
| `full` | 로그인, DB, 권한, 프로덕션 인증 콜백, 저장된 사용자 데이터, 운영 기능 필요 | 전체 기획 문서 |

자동 추천 기준:

- 로그인, 데이터베이스, 권한, 파일 저장, 사용자별 저장 데이터가 `needed`이면 → `full` 추천.
- API, 서버사이드 AI 호출, 로컬 파일 처리, 요청/응답 워크플로가 `needed`이지만 DB/로그인이 불필요하면 → `local-server` 추천.
- 하나의 화면과 브라우저 인터랙션으로 아이디어를 검증할 수 있으면 → `html` 추천.

파일을 작성하기 전에 추천 레벨을 보여주고 사용자의 확인 또는 변경을 받는다. 사용자가 레벨을 지정하지 않고 아이디어가 애매하면 `html`로 기본 설정한다.

---

## 대화 흐름

아래 순서로 기획 대화를 진행한다.

1. **아이디어 인테이크**
   - 워크스페이스 사전 점검을 먼저 실행한다.
   - 5문항 시작 루틴을 사용한다.
   - 직접 답변, 붙여넣은 외부 AI 요약, 로컬 요약 문서 경로를 모두 수용한다.
   - 정규화된 결과를 기획 문서 작성 시 `INTAKE_SUMMARY.md`에 저장한다.

2. **레벨 결정**
   - `html`, `local-server`, `full` 중 하나를 추천한다.
   - 이유를 짧은 단락으로 설명한다.
   - 파일을 작성하기 전에 레벨을 확인한다.

3. **범위 축소 (Scope Cut)**
   - 필수 기능(must-have) 3개를 선택한다.
   - 명시적인 비목표(non-goal) 3개를 선택한다.
   - 로그인, 데이터베이스, 파일 업로드, 결제, AI, 관리자, 애널리틱스, 배포를 `needed` / `later` / `not needed`로 표시한다.

4. **유저 플로우**
   - 첫 화면, 주요 행동, 성공 상태, 빈 상태, 오류 상태, 복귀 경로를 정의한다.
   - `html`: 모든 것을 한 페이지에 유지한다.
   - `local-server`: 화면은 `public/*`, API는 `server.js`에 유지한다.
   - `full`: 인증이 필요한 경우 랜딩/목록 페이지와 보호된 상세/계정 페이지를 분리한다.

5. **데이터 모델**
   - `html`: 임시 브라우저 상태 외에 데이터 모델을 만들지 않는다.
   - `local-server`: 요청/응답 형태를 정의하고, 사용자가 명시적으로 `full`로 업그레이드하지 않는 한 DB를 사용하지 않는다.
   - `full`: 엔티티, 필드, 소유자, 가시성, CRUD 요구사항, RLS 패턴을 나열한다.

6. **페이즈 계획**
   - 독립적으로 완료 및 검증할 수 있는 페이즈로 구현을 분할한다.
   - 선택한 레벨에서 필요한 경우에만 Auth, DB, 배포, 애널리틱스 페이즈를 포함한다.

7. **검증 하네스 (Validation Harness)**
   - 각 페이즈에 완료 기준과 명령어를 추가한다.
   - `html`: 브라우저 열기 확인만 사용한다.
   - `local-server`: `npm run dev`, `curl`, 브라우저 확인을 사용한다.
   - `full`: 브라우저 확인, 라우트 확인, 인증 리다이렉트, DB/RLS 확인, 배포 확인을 포함한다.

8. **개발 프롬프트 (Claude Code Prompts)**
   - 페이즈별로 프롬프트를 하나씩 생성한다.
   - 각 프롬프트는 루트 `PROJECT_GUIDE.md`를 먼저 읽을 것, 무엇을 할지, 무엇을 하지 말 것, 어떤 상세 파일을 읽을지, 어떤 검증을 실행할지를 명시해야 한다.

---

## 산출물 파일

사용자가 계획 저장을 요청하면 선택된 레벨에 맞는 파일만 생성한다.

**Level 1 `html`:**

```
PROJECT_GUIDE.md
index.html
docs/planning/ONE_PAGE_PLAN.md
docs/planning/CHECKLIST.md
docs/planning/PROMPTS.md
```

**Level 2 `local-server`:**

```
PROJECT_GUIDE.md
package.json
server.js
public/index.html
public/styles.css
public/app.js
docs/planning/PRD.md
docs/planning/API_PLAN.md
docs/planning/PHASE_PLAN.md
docs/planning/VALIDATION_HARNESS.md
docs/planning/PROMPTS.md
```

**Level 3 `full`:**

```
PROJECT_GUIDE.md
docs/planning/INTAKE_SUMMARY.md
docs/planning/PRD.md
docs/planning/MVP_SCOPE.md
docs/planning/USER_FLOW.md
docs/planning/DATA_MODEL.md
docs/planning/PHASE_PLAN.md
docs/planning/VALIDATION_HARNESS.md
docs/planning/PROMPTS.md
```

`PROJECT_GUIDE.md`를 개발 진입점으로 사용한다. 이후 구현 세션은 코드를 건드리기 전에 이 파일을 먼저 읽어야 한다. 상세 문서는 `docs/planning` 아래에 두고 루트 가이드에서 링크한다.

파일이 없으면 번들 스캐폴드 스크립트를 사용한다.

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/create_planning_docs.js \
  --level html \
  --out docs/planning \
  --app-name "앱 이름" \
  --idea "앱 아이디어 한 줄" \
  --audience "대상 사용자" \
  --problem "해결할 문제"
```

그런 다음 생성된 템플릿을 실제 기획 내용으로 채운다.

레벨 확인 후 `--level local-server` 또는 `--level full`을 사용한다.

---

## 페이즈 기본값

앱이 다른 순서가 필요하지 않으면 아래 기본값을 사용한다.

**Level 1 `html`:**
- Phase 1. One HTML Prototype: `index.html` 생성
- Phase 2. Browser Interaction: 간단한 JS 상태 추가
- Phase 3. Polish: 모바일 및 문구 확인

**Level 2 `local-server`:**
- Phase 1. Static Public UI: `public/*` 구축
- Phase 2. Local API: `server.js`에 API 엔드포인트 1개 추가
- Phase 3. Core Workflow: UI와 API 연결
- Phase 4. Polish: 로딩, 오류, 모바일 레이아웃 처리
- Phase 5. Runbook: `npm install` 및 `npm run dev` 문서화

**Level 3 `full`:**
- Phase 0. Planning Lock: PRD, MVP, 비목표, 하네스 확인
- Phase 1. Static UI: 로컬 목 데이터만으로 화면 구축
- Phase 2. Data Model: 스키마, 시드 데이터, RLS 계획 정의
- Phase 3. Core Workflow: 주요 사용자 행동을 처음부터 끝까지 구현
- Phase 4. Auth & Permissions: 로그인, 보호 라우트, 소유자 확인, 리다이렉트 추가
- Phase 5. Deployment: 환경 변수, 빌드, 프로덕션 URL, 콜백 URL 설정
- Phase 6. Operations: 애널리틱스, 가입 확인, 오류 확인, 릴리스 노트

---

## 하네스 요구사항

모든 페이즈에 포함해야 하는 항목:
- Goal(목표)
- Tasks(작업)
- Completion criteria(완료 기준)
- Validation commands(검증 명령어)
- Browser checks(브라우저 확인)
- Next phase gate(다음 페이즈 진입 조건)
- Rollback or failure handling note(롤백 또는 실패 처리 메모)

공통 검증 명령어:

```bash
npm run lint
npm run build
```

npm 프로젝트가 있는 레벨에서만 이 명령어를 사용한다. `html`은 브라우저 직접 확인을 사용한다. 라우트 확인은 `curl -I` 예시를 사용한다. 인증 앱은 다음을 요구한다:
- 공개 랜딩 페이지가 200을 반환
- 보호된 상세 페이지가 `/login?next=...`으로 리다이렉트
- 로그인 성공 시 원래 페이지로 복귀
- 로그아웃 후 보호된 페이지가 다시 차단됨

---

## 산출물 스타일

- 기획 문서는 초보자를 위해 명확한 한국어로 작성한다.
- MVP는 작고 명확하게 유지한다.
- 긴 글 대신 체크리스트와 표를 선호한다.
- 가정사항은 확인된 요구사항과 별도로 표시한다.
- "기타" 또는 "나중에 통합" 같은 모호한 표현 뒤에 위험한 범위를 숨기지 않는다.

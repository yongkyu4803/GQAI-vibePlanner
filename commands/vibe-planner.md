---
description: "초보 바이브코더의 아이디어를 적절한 크기의 프로젝트 계획으로 전환. 워크스페이스 확인 → 레벨 선택(HTML/로컬서버/풀) → 기획 문서 생성 → 다음 스킬 안내. PRD, 기획, MVP, 페이즈 계획, 하네스, 개발 프롬프트, 레벨 업그레이드가 필요할 때 사용."
allowed-tools: [Bash, Read, Write, Edit, AskUserQuestion, Skill]
---

# /GQAI-vibe-planner:vibe-planner

기획 문서만 만든다. 앱 코드는 만들지 않는다(코드는 PROMPTS.md의 Phase 1부터).
스크립트는 `~/.claude/skills/GQAI-vibe-planner/scripts/`에 있고 모두 JSON을 출력한다.

## 0. 최신 버전 확인

```bash
bash ~/.claude/skills/GQAI-vibe-planner/scripts/update_check.sh
```

결과 한 줄만 사용자에게 전하고 다음으로 넘어간다. 실패해도 멈추지 않는다.

## 1. 작업 폴더 점검

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/check_workspace.js [폴더]
```

`recommendation`에 따라:

| 값 | 할 일 |
| --- | --- |
| `clean-workspace` | 이 폴더에서 바로 2단계로 |
| `continue-planner-workspace` | 기존 플래너 폴더. `detectedLevel`을 알려주고 "이어서 수정 / 레벨 올리기(6단계) / 새로 시작" 중 묻는다 |
| `confirm-before-writing` | 보이는 파일 목록을 보여주고 여기에 써도 되는지 묻는다 |
| `create-new-folder-and-rerun` | 멈추고 묻는다: ①바탕화면에 새 폴더 ②직접 만든 폴더 경로 ③여기서 계속(기존 파일과 섞임) |

①이면 `node ~/.claude/skills/GQAI-vibe-planner/scripts/create_workspace.js` 를 실행한다. 세션 위치는 바뀌지 않으므로 **이후 모든 스크립트에 `--root <workspacePath>`(validate·check는 첫 인자)를 넘기고**, 파일도 그 경로 아래에 쓴다.

## 2. 인테이크

AskUserQuestion: "기획 내용을 어떻게 입력할까요?"
- **A. 지금 바로 답하기** — `~/.claude/skills/GQAI-vibe-planner/assets/intake_questions.md`의 5문항을 보여주고 모두 답할 때까지 기다린다.
- **B. 다른 AI와 대화 후 붙여넣기** (기획이 막연할 때 추천) — `~/.claude/skills/GQAI-vibe-planner/assets/external_ai_prompt.txt`를 그대로 출력하고, 결과를 붙여넣어 달라고 한다.
- **C. 파일로 불러오기** — 경로를 받아 Read. 못 읽으면 붙여넣기를 요청한다.

어느 경우든 결정사항 / 가정 / 미확정 질문 / 리스크와 5번 항목별 needed·later·not needed·unknown 으로 정리해 보여준다.

## 3. 레벨 결정

검증 가능한 가장 작은 레벨을 추천하고 한 단락으로 이유를 댄 뒤 확인받는다. 애매하면 `html`.

| 레벨 | 고르는 조건 |
| --- | --- |
| `html` | 한 화면 + 브라우저 동작으로 검증 가능. 서버·API·저장 없음 |
| `local-server` | API, 서버 쪽 AI 호출, 로컬 파일 처리가 needed. DB·로그인은 불필요 |
| `full` | 로그인, DB, 권한, 파일 저장, 사용자별 데이터 중 하나라도 needed |

`full`이면 질문 하나를 더 한다: "정해 둔 기술 스택이 있나요? 없으면 Next.js + Supabase + Vercel로 갑니다." 답을 `--stack`으로 넘긴다.

## 4. 문서 뼈대 생성

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/create_planning_docs.js --level <레벨> [--root <폴더>] \
  --app-name "…" --idea "…" --audience "…" --problem "…" [--stack "…"]
```

스크립트가 만든 파일(`created`)이 이번 산출물의 전부다. `skipped`가 있으면 덮어쓰지 말고 사용자에게 알린다.

## 5. 문서 채우기와 검증

`created`의 파일을 하나씩 열어 인테이크 내용으로 채운다. 각 파일의 `<!-- -->` 주석이 그 자리의 작성 지침이며, 채운 뒤 지침 주석은 지운다("채우는 법"·"기술 스택" 주석은 남겨도 된다).

- 초보자용 쉬운 한국어, 긴 글보다 표와 체크리스트.
- 가정은 확정 요구사항과 따로 표시한다. "기타", "나중에 통합" 뒤에 위험한 범위를 숨기지 않는다.
- not needed 항목의 Phase는 지우지 말고 "건너뜀: 이유"로 남긴다.
- PROJECT_GUIDE.md의 "Phase 상태"(다음 작업·완료 조건)를 반드시 채운다.

다 채운 뒤:

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/validate_docs.js [폴더]
```

`ok: true`가 될 때까지 `errors`를 고친다. `warnings`는 사용자에게 보여주고 판단을 맡긴다.

## 6. 레벨 올리기 (기존 플래너 폴더)

`html → local-server → full` 처럼 올릴 때:

```bash
node ~/.claude/skills/GQAI-vibe-planner/scripts/create_planning_docs.js --level <새 레벨> --upgrade [--root <폴더>] …
```

- 기존 파일은 그대로 두고, 겹치는 파일의 새 버전은 `_upgrade/<레벨>/`에 생긴다(`pendingMerge`).
- 기존 내용(인테이크, 확정 결정)을 살리면서 새 버전의 구조로 병합하고 `_upgrade` 폴더를 지운다.
- PROJECT_GUIDE.md의 `레벨 코드`와 "레벨 변경 기록" 표에 한 줄 추가한다.
- 5단계의 채우기와 검증을 다시 한다.

## 7. 마무리: 다음 할 일 하나

만든 파일 목록과 함께 **다음 할 일 하나만** 안내한다.

- `html`, `local-server`: PROJECT_GUIDE.md "다음 단계"의 프롬프트를 새 세션에 붙여넣어 Phase 1을 시작한다.
- `full` + 기본 스택: `/vibe:nextjs-init`으로 뼈대부터 만든다(기획 문서는 그대로 남는다). 이후 순서는 PROJECT_GUIDE.md "다음 단계" 표에 있다.
- `full` + 다른 스택: PROMPTS.md의 Phase 1 프롬프트로 시작한다.

AskUserQuestion으로 "바로 시작할까요?"를 묻고, 스킬을 고른 경우 Skill 도구로 실행한다.

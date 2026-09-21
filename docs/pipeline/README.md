# 전체 유지보수 pipeline 가이드 (운영자용)

이 문서는 AAIG 사이트를 **지속 운영**할 때 필요한 전체 흐름을 한 번에 설명합니다.
목표는 “무엇을 수정하고, 어떤 명령을 실행하고, 무엇이 자동 생성되며, GitHub Pages에 어떻게 반영되는지”를 명확히 이해하는 것입니다.

> 전제: 이 project는 **GitHub Pages 정적 사이트**입니다. Publication 원본은 Google Sheet이며, 나머지는 파일 + build + GitHub Actions로 운영합니다.

---

## 1) 먼저 이해할 운영 구조

운영 대상은 크게 4개입니다.

1. Research
2. News
3. Publication
4. Conference Calendar(학회 마감)

여기에 연구실 공개 페이지를 자동 수집하는 **외부 소스 registry**가 보조로 붙습니다.

주요 원칙:

- 운영자는 **원본 data/content 파일만 수정**합니다.
- 생성 파일은 script가 다시 만들기 때문에 직접 수정하지 않습니다.

---

## 2) 어떤 파일을 직접 수정하는가 / 자동 생성되는가

## 2-1. 운영자가 직접 수정하는 경로 (Hand-edited)

1. Research 원본
    - `src/assets/dataset/research_areas.json`
    - `src/assets/dataset/research_area_details.json`
    - `src/assets/images/research_areas/*.webp`, `src/assets/images/research_labs/*.webp`
2. News 원본
    - `content/news/*.md`
3. Publication 원본과 배포 스냅샷
    - 관리자용 Google Sheet
    - `content/publications/sheet.snapshot.json` (직접 편집 금지)
    - `content/publications/<area>/*.md` (Sheet에 없는 수동 항목만)
4. Conference Calendar 원본
    - `content/deadlines/venues.json`
5. 외부 수집 대상 registry
    - `content/sources/labs.json`
6. 연구실·구성원 소개와 Apply 안내 문구
    - `src/data/laboratories.js`, `src/data/contactDirectory.js`

## 2-2. 자동 생성되는 경로 (Auto-generated)

1. 동기화 결과(JSON)
    - `src/generated/news.generated.json`
    - `src/generated/publications.generated.json`
    - `src/generated/deadlines.generated.json`
2. 외부 소스 캐시
    - `content/sources/cache/news.json`
    - `content/sources/cache/publications.json`
3. build 산출물
    - `dist/...`
4. Research route와 Publication category label
    - `research_areas.json`을 기준으로 build 시 구성

## 2-3. 직접 수정 금지 경로

- `src/generated/*`
- `content/publications/sheet.snapshot.json`
- `content/sources/cache/*`
- `dist/*`

이 경로들은 직접 고치는 대신, `content:sync` / `publications:pull` / `content:refresh` / `build`로 재생성해야 합니다.
Research route 목록과 category label도 component에 중복 입력하지 않고 Research catalog에서 파생합니다.

---

## 3) 전체 유지보수 흐름(처음 맡은 사람용)

아래 순서대로 진행하면 안전합니다.

1. Research 영역·상세 수정
    - `src/assets/dataset/research_*.json`
    - 필요 시 Research WebP 추가/교체
2. News 추가/수정
    - `content/news/*.md`
3. Publication 추가/수정
    - Google Sheet 수정 → 자동 동기화 PR을 기다리거나 `npm run publications:pull`
4. Conference Calendar 수정
    - `content/deadlines/venues.json`의 학회와 마일스톤
5. Research 구조와 content 동기화
    ```bash
    npm run research:validate
    npm run content:sync
    ```
6. content 검증
    ```bash
    npm run validate:content
    ```
7. 로컬 확인(개발 server)
    ```bash
    npm run dev
    ```
8. build 확인
    ```bash
    npm run build
    ```
9. Git commit / push
10. GitHub Actions deploy 확인
    - `Content Build Check`
    - `Deploy GitHub Pages`

---

## 4) 운영 명령어(실제 project 기준)

아래는 `package.json` 기준 실제 명령어입니다.

```bash
# Research 검증 + News/Publication/Calendar 전체 동기화
npm run content:sync

# 동기화 결과가 커밋되지 않은 채 남아 있으면 실패(CI와 같은 검사)
npm run content:check

# Research 영역·상세 관계 검증
npm run research:validate

# Google Sheet에서 Publication 스냅샷 가져오기
npm run publications:pull

# Sheet 가져오기용 CSV template 검증
npm run publications:sheet:check

# 외부 공개 페이지에서 News/Publication 수집 후 전체 동기화
npm run content:refresh

# schema/형식 검증(파일을 쓰지 않음)
npm run validate:content

# npm 의존성 취약점 검증
npm run audit:dependencies

# 포맷과 lint
npm run format
npm run format:check
npm run lint

# 로컬 개발 server 실행
npm run dev

# 프로덕션 build (prebuild에서 validate:content 자동 실행)
npm run build

# route별 정적 HTML까지 생성
npm run build:static

# build 결과 로컬 preview
npm run preview

# 운영자용 종합 점검(dependency audit + 동기화 + build)
npm run operator:verify
```

---

## 5) 외부 소스 수집은 어떻게 동작하는가

연구실 공개 페이지에서 News/Publication 후보를 주기적으로 가져옵니다.

1. 수집 대상 정의: `content/sources/labs.json`
    - `enabled: false`인 항목은 기록만 남고 수집하지 않습니다.
    - 비활성 이유는 `disabled_reason`에 적습니다.
2. 실행: `npm run content:refresh` 또는 `Refresh External Content` 워크플로(매주 수요일)
3. 출력: `content/sources/cache/*.json`에 정규화된 후보가 쌓이고, 이어서 전체 동기화가 실행됩니다.

즉, 운영자는 새 연구실 소스를 추가할 때 registry 한 줄만 추가하면 됩니다.

---

## 6) 검증(Validation)은 무엇을 확인하는가

`npm run validate:content`는 다음을 점검합니다.

1. Research key/slug/detail/image 관계
2. 필수 필드 누락 여부
3. 날짜 형식(`YYYY-MM-DD`)과 마감 시각(`deadline_at`) 형식
4. 링크 형식(`http://`, `https://`)
5. content 구조 schema 오류

검증에서 실패하면 deploy 전에 반드시 수정해야 합니다.

---

## 7) GitHub Pages deploy 흐름

현재 deploy는 GitHub Actions로 자동화되어 있습니다.

## 7-1. 어떤 workflow가 동작하는가

1. `.github/workflows/content-build.yml`
    - 이름: `Content Build Check`
    - 트리거: `main` push, PR
    - 수행: audit → format/lint → Sheet CSV template 검증 → `content:sync` → 생성물 커밋 여부 확인 → `validate:content` → `build`
2. `.github/workflows/deploy-pages.yml`
    - 이름: `Deploy GitHub Pages`
    - 트리거: `main` push, 수동 실행
    - 수행: `content:sync` → `validate:content` → `build:static` → `gh-pages` deploy
3. `.github/workflows/publications-sheet-sync.yml`
    - 이름: `Sync Publications from Google Sheets`
    - 트리거: 매일 02:15 UTC, 수동 실행
    - 수행: Sheet 가져오기 → 동기화 → 검증 → 정적 build → 검토용 PR 생성
4. `.github/workflows/content-refresh.yml`
    - 이름: `Refresh External Content`
    - 트리거: 매주 수요일 03:20 UTC, 수동 실행
    - 수행: 외부 소스 수집 → 검증 → 정적 build → `gh-pages` deploy

## 7-2. push 후 무슨 일이 일어나는가

1. `main`에 push
2. Actions가 Node 설치 + 의존성 설치
3. content 동기화/검증/build 수행
4. `dist`가 `gh-pages`에 게시됨
5. GitHub Pages URL에 반영됨

## 7-3. deploy 완료 확인 방법

1. GitHub 저장소 → `Actions` tab
2. 최신 실행에서 아래 2개가 성공(초록)인지 확인
    - `Content Build Check`
    - `Deploy GitHub Pages`
3. 사이트에서 변경된 내용 확인
    - Home 미리보기
    - `/research`, `/news`, `/publication`, `/calendar`, `/lab`, `/apply`

## 7-4. 오래된 내용이 계속 보일 때

1. 브라우저 강력 새로고침 (`Ctrl+F5` / `Cmd+Shift+R`)
2. Actions 재실행 여부 확인
3. 실패 로그 확인
4. content 파일 오타/형식 오류 수정 후 재푸시

---

## 8) 절대 수정하면 안 되는 것

다음은 운영자가 직접 편집하지 않는 것이 원칙입니다.

1. `src/generated/*.generated.json`
    - 수동 수정 금지, 동기화로 재생성
2. `content/publications/sheet.snapshot.json`
    - 수동 수정 금지, `publications:pull`로 재생성
3. `content/sources/cache/*`
    - 수동 수정 금지, `content:refresh`로 재생성
4. `dist/*`
    - 수동 수정 금지, `build`로 재생성
5. deploy workflow 파일(`.github/workflows/*`)
    - 운영 목적(content 수정)에서는 함부로 변경 금지
6. page component(`src/components/tabs/*`)
    - Content Operations 단계에서 불필요한 코드 수정 금지

---

## 9) 점검 체크리스트

## 9-1. Research 수정 체크리스트

1. canonical key가 화면 제목의 의미와 일치하는지 확인
2. `area_order`, `areas`, `topics`의 key 일치
3. slug가 key의 `_`를 `-`로 바꾼 값인지 확인
4. 이미지 variant가 실제로 존재하는지 확인
5. `npm run research:validate`
6. `/research`와 각 상세 route 확인

## 9-2. News 추가 체크리스트

1. `content/news/*.md`에 파일 추가
2. 필수 필드(`id/type/title/summary/date`) 입력
3. 날짜 형식 확인
4. 외부 링크면 `is_external: true` + `external_url`
5. `npm run content:sync`
6. `npm run validate:content`

## 9-3. Publication 추가 체크리스트

1. Google Sheet에 행 추가
2. `category`가 `research_areas.json`의 canonical key인지 확인
3. 필수 필드와 `labs` 입력, `venue`는 `CVPR 2026` 형식
4. 자동 동기화 PR을 기다리거나 로컬에서 `npm run publications:pull`
5. 검증된 PR을 병합하고 배포 확인

## 9-4. Conference Calendar 수정 체크리스트

1. `content/deadlines/venues.json`에 학회/마일스톤 추가
2. `deadline_at`을 ISO 형식으로 입력하고 표시 시간대(KST) 확인
3. 공식 CFP 링크가 열리는지 확인
4. `npm run content:sync` → `npm run validate:content`
5. `/calendar`에서 목록과 월 달력 확인

## 9-5. deploy 전 체크리스트

1. `npm run research:validate`
2. `npm run content:sync`
3. `npm run validate:content`
4. `npm run build`
5. 필요 시 `npm run preview`
6. 변경사항 커밋/푸시

## 9-6. deploy 후 확인 체크리스트

1. Actions 2개 성공 여부 확인
2. 실제 사이트 반영 확인
3. 주요 경로 확인
    - `/research`, `/news`, `/publication`, `/calendar`, `/lab`, `/apply`
4. 캐시 문제 시 강력 새로고침

---

## 10) 관련 문서 바로가기

- 운영 총괄: `docs/README.md`
- Research: `docs/research/README.md`
- News: `docs/news/README.md`
- Publication: `docs/publications/README.md`
- Google Sheet 연동: `docs/publications/google-sheets.md`
- `/admin` 통계: `docs/admin/README.md`
- deploy: `docs/deployment/README.md`
- 문제 해결: `docs/troubleshooting/README.md`

# Google Sheets Publication 운영 가이드

AAIG Publication은 공개 읽기 가능한 Google Sheet를 원본으로 사용합니다.
편집 권한은 승인된 관리자에게만 부여하고, 홈페이지는 검증된 GitHub
스냅샷을 사용합니다.

## 1. 데이터 흐름

1. 관리자가 Google Sheet를 수정합니다.
2. `/admin`에서 `동기화 PR 만들기`를 누릅니다.
3. Cloudflare Worker가 GitHub Actions를 실행합니다.
4. Actions가 공개 CSV를 가져와 모든 행을 검사합니다.
5. 검사와 정적 빌드가 성공하면 검토용 Pull Request를 만듭니다.
6. PR을 병합하면 GitHub Pages가 자동 배포됩니다.

잘못된 행이나 Google 장애가 있으면 기존
`content/publications/sheet.snapshot.json`을 계속 사용합니다.

## 2. Google Sheet 만들기

1. Google Drive에서 새 스프레드시트를 만듭니다.
2. `docs/publications/publications-sheet-import.csv`를 가져옵니다.
3. 데이터 탭 이름을 정확히 `Publications`로 지정합니다.
4. 첫 행을 고정하고 필터를 켭니다.
5. `date` 열의 표시 형식을 일반 텍스트로 설정합니다.
6. `enabled`와 `featured`에는 `TRUE` 또는 `FALSE`만 입력합니다.
7. `keywords`와 `labs`에서 값이 여러 개면 `|`로 구분합니다.

CSV에는 현재 서비스 중인 114개 Publication이 들어 있습니다. 기존 행의
`id`는 URL 연결과 News 식별에 사용되므로 변경하지 않습니다.

## 3. 공유 권한

Google Sheet의 공유 설정에서 다음처럼 지정합니다.

- 일반 액세스: 링크가 있는 모든 사용자, 뷰어
- 관리자 Google 계정: 편집자
- 방문자 편집 허용: 사용하지 않음

공개 CSV 요청이 차단되면 Google Sheets의 `파일 → 공유 → 웹에 게시`에서
`Publications` 탭을 CSV로 게시합니다. 데이터 자체는 홈페이지에 공개되는
Publication 정보만 넣고 내부 메모나 개인정보는 넣지 않습니다.

일반 Sheet 주소에서 `SPREADSHEET_ID`를 확인한 뒤 CSV 주소를 만듭니다.

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:csv&sheet=Publications
```

로그아웃 상태의 브라우저에서 이 주소가 CSV를 반환하는지 확인합니다.

## 4. 열 규칙

| 열            | 필수   | 규칙                                             |
| ------------- | ------ | ------------------------------------------------ |
| `enabled`     | 예     | `TRUE`인 행만 게시 후보가 됩니다.                |
| `id`          | 예     | 전체에서 고유하며 기존 값은 변경하지 않습니다.   |
| `category`    | 예     | 허용된 Research category key를 사용합니다.       |
| `status`      | 예     | `published`, `working`, `project` 중 하나입니다. |
| `title`       | 예     | 중복 제목을 허용하지 않습니다.                   |
| `date`        | 예     | `YYYY-MM-DD` 형식입니다.                         |
| `authors`     | 예     | 화면에 표시할 저자 문자열입니다.                 |
| `venue`       | 예     | `CVPR 2026`처럼 약자와 연도를 함께 씁니다.       |
| `keywords`    | 예     | 여러 값은 `                                      | `로 구분합니다. 빈 값은 허용됩니다. |
| `labs`        | 예     | 하나 이상 필요하며 여러 값은 `                   | `로 구분합니다.                     |
| `pdf_url`     | 예     | 빈 값 또는 `http(s)` URL입니다.                  |
| `arxiv_url`   | 예     | 빈 값 또는 `http(s)` URL입니다.                  |
| `github_url`  | 예     | 빈 값 또는 `http(s)` URL입니다.                  |
| `project_url` | 예     | 빈 값 또는 `http(s)` URL입니다.                  |
| `featured`    | 예     | `TRUE` 또는 `FALSE`입니다.                       |
| `summary`     | 예     | Publication 미리보기 설명입니다.                 |
| `notes`       | 아니요 | 운영 메모이며 홈페이지에는 반영되지 않습니다.    |

25%를 넘는 대량 삭제는 실수 방지를 위해 기본적으로 거부됩니다.

## 5. GitHub Variables 설정

저장소의 `Settings → Secrets and variables → Actions → Variables`에 다음 두
값을 등록합니다.

| 변수                         | 값                                 |
| ---------------------------- | ---------------------------------- |
| `PUBLICATIONS_SHEET_URL`     | 관리자가 열 일반 Google Sheet 주소 |
| `PUBLICATIONS_SHEET_CSV_URL` | 위에서 만든 공개 CSV 주소          |

이 값은 비밀정보가 아닙니다. Sheet에는 공개 가능한 데이터만 보관합니다.

## 6. Cloudflare Worker의 GitHub 토큰 설정

GitHub fine-grained personal access token을 다음 조건으로 만듭니다.

- Repository access: `AjouAIGroup/AjouAIGroup.github.io`만 선택
- Repository permissions: Actions `Read and write`
- 가능한 짧은 만료일 지정

토큰을 복사한 뒤 Worker 폴더에서 Secret으로 등록합니다.

```bash
cd cloudflare/admin-api
npx wrangler secret put GITHUB_ACTIONS_TOKEN
npx wrangler deploy --env=""
```

토큰은 코드, `.env`, Google Sheet에 입력하지 않습니다. 만료 전에 새 토큰을
등록하고 기존 토큰을 폐기합니다.

## 7. 최초 배포

1. Google Sheet와 CSV 공개 주소를 준비합니다.
2. GitHub Variables 두 개를 등록합니다.
3. Worker Secret을 등록하고 Worker를 배포합니다.
4. 변경 코드를 `main`에 반영해 홈페이지를 배포합니다.
5. `/admin`에서 기존 관리자 접근 키를 입력합니다.
6. `Google Sheet 열기`와 `동기화 PR 만들기`가 동작하는지 확인합니다.

## 8. 일반 운영

1. Sheet에서 행을 추가하거나 수정합니다.
2. URL, 날짜, category, venue 연도를 확인합니다.
3. 관리자 페이지에서 동기화 버튼을 누릅니다.
4. `실행 상태 보기`에서 Actions 결과를 확인합니다.
5. 자동 생성된 PR의 추가·수정·삭제 내용을 검토합니다.
6. PR을 병합하고 Pages 배포 완료를 확인합니다.

매일 한국시간 오전 11시 15분에도 같은 동기화가 자동 실행됩니다. 변경이
없으면 PR을 만들지 않습니다.

## 9. 로컬 검증

Google Sheet를 가져오려면 환경변수를 지정합니다.

```bash
PUBLICATIONS_SHEET_CSV_URL="공개 CSV 주소" \
PUBLICATIONS_SHEET_URL="일반 Sheet 주소" \
npm run publications:pull
```

가져온 뒤 전체 파이프라인을 검사합니다.

```bash
npm run content:sync
npm run publications:sheet:check
npm run validate:content
npm run build:static
```

## 10. 오류 대응

- `Missing required columns`: 첫 행의 영문 열 이름과 누락 열을 확인합니다.
- `sheet row N`: 표시된 Sheet 행의 필수값, 날짜, URL을 수정합니다.
- `Duplicate id/title`: 중복된 ID 또는 제목을 하나로 정리합니다.
- `returned 401/403`: CSV가 로그아웃 사용자에게 공개되는지 확인합니다.
- `Refusing to replace`: 대량 삭제가 의도된 것인지 먼저 검토합니다.
- 관리자 버튼의 `401`: 기존 관리자 접근 키를 다시 입력합니다.
- 관리자 버튼의 `503`: Worker에 GitHub Actions 토큰이 등록되지 않았습니다.

동기화 실패는 현재 배포 데이터에 영향을 주지 않습니다.

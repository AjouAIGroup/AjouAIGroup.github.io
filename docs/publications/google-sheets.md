# Google Sheets Publication 운영 가이드

AAIG Publication은 공개 읽기 가능한 Google Sheet를 원본으로 사용합니다.
편집 권한은 승인된 관리자에게만 부여하고, 홈페이지는 검증된 GitHub
스냅샷을 사용합니다.

## 1. 데이터 흐름

1. 운영자가 `/admin`의 Publication 관리에서 행을 수정·추가하거나, Google
   Sheet를 직접 수정합니다.
2. `/admin`에서 저장하면 Cloudflare Worker가 서비스 계정으로 Sheet에 쓰고,
   곧바로 동기화 워크플로를 실행합니다. Sheet를 직접 고쳤다면 `/admin`의
   `지금 동기화`를 누르거나 매일 예약된 실행을 기다립니다.
3. Actions가 공개 CSV를 가져와 모든 행을 검사합니다.
4. 검사와 정적 빌드가 성공하면 검토용 Pull Request를 만듭니다.
5. PR을 병합하면 GitHub Pages가 자동 배포됩니다.

`/admin` 편집기와 동기화는 같은 검증 규칙
(`src/utils/publicationSheetRules.js`)을 사용하므로, 편집기에서 저장된 행은
동기화에서도 통과합니다.

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
`id`는 URL 연결과 News 식별에 사용되므로 변경하지 않습니다. 새 행에서는
`id`를 입력하지 않습니다. 가져오기 과정에서 제목을 기반으로 자동 생성합니다.
빈 `id`를 사용하려면 제목에 영문자 또는 숫자가 하나 이상 포함되어야 합니다.

자동 생성된 ID는 저장소 스냅샷에 기록되고, 이후 가져오기에서 같은 행에 다시
사용됩니다. `id` 셀을 비워둔 채 제목을 고쳐도 Publication URL과 자동 News
식별이 유지되므로, 생성된 값을 Sheet에 옮겨 적을 필요가 없습니다.

제목이 바뀐 행은 다음 조건을 모두 만족할 때 이전 ID를 이어받습니다. 조건을
만족하지 않으면 새 논문으로 보고 새 ID를 받으며, 검토용 PR에서 확인할 수
있습니다.

- 이전 제목이 Sheet에서 사라졌습니다.
- 관사와 전치사를 뺀 제목 단어의 60% 이상이 이전 제목과 같습니다.
- `venue` 또는 `authors`가 이전 값과 같습니다.

가져오기 로그에는 `kept id "..." after the title changed` 또는
`new publication id "..."`로 결과가 표시됩니다. 제목을 완전히 바꾸면서 URL을
유지해야 하는 행만 기존 ID를 `id` 셀에 직접 입력합니다.

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

| 열            | 필수   | 규칙                                                               |
| ------------- | ------ | ------------------------------------------------------------------ |
| `enabled`     | 예     | `TRUE`인 행만 게시 후보가 됩니다.                                  |
| `id`          | 아니요 | 열은 유지하고 새 행에서는 비워둡니다. 기존 값은 변경하지 않습니다. |
| `category`    | 예     | 허용된 Research category key를 사용합니다.                         |
| `status`      | 예     | `published`, `working`, `project` 중 하나입니다.                   |
| `title`       | 예     | 중복 제목을 허용하지 않습니다.                                     |
| `date`        | 예     | `YYYY-MM-DD` 형식입니다.                                           |
| `authors`     | 예     | 화면에 표시할 저자 문자열입니다.                                   |
| `venue`       | 예     | `CVPR 2026`처럼 약자와 연도를 함께 씁니다.                         |
| `keywords`    | 예     | 여러 값은 `\|`로 구분합니다. 빈 값은 허용됩니다.                   |
| `labs`        | 예     | 하나 이상 필요하며 여러 값은 `\|`로 구분합니다.                    |
| `pdf_url`     | 예     | 빈 값 또는 `http(s)` URL입니다.                                    |
| `arxiv_url`   | 예     | 빈 값 또는 `http(s)` URL입니다.                                    |
| `github_url`  | 예     | 빈 값 또는 `http(s)` URL입니다.                                    |
| `project_url` | 예     | 빈 값 또는 `http(s)` URL입니다.                                    |
| `featured`    | 예     | `TRUE` 또는 `FALSE`입니다.                                         |
| `summary`     | 예     | Publication 미리보기 설명입니다.                                   |
| `notes`       | 아니요 | 운영 메모이며 홈페이지에는 반영되지 않습니다.                      |

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
- Repository permissions: Actions `Read and write`, Pull requests `Read-only`
- 가능한 짧은 만료일 지정

Actions 권한은 저장 직후 동기화를 시작하는 데, Pull requests 권한은 `/admin`에
검토 PR 링크를 보여주는 데 사용합니다. 저장소 `Settings → Actions → General`의
`Allow GitHub Actions to create and approve pull requests`도 켜져 있어야 동기화
워크플로가 PR을 만들 수 있습니다.

토큰을 복사한 뒤 Worker 폴더에서 Secret으로 등록합니다.

```bash
cd cloudflare/admin-api
npx wrangler secret put GITHUB_ACTIONS_TOKEN
npx wrangler deploy --env=""
```

토큰은 코드, `.env`, Google Sheet에 입력하지 않습니다. 만료 전에 새 토큰을
등록하고 기존 토큰을 폐기합니다.

## 7. `/admin` 편집용 서비스 계정 설정

`/admin`에서 저장한 내용은 Google 서비스 계정이 Sheet에 대신 씁니다. 운영자
개인 계정의 권한을 Worker에 넘기지 않기 위한 구조입니다.

1. Google Cloud Console에서 로그인용 OAuth 클라이언트와 같은 프로젝트를
   선택합니다.
2. **APIs & Services > Library**에서 **Google Sheets API**를 사용 설정합니다.
3. **IAM & Admin > Service Accounts**에서 서비스 계정을 만듭니다. 역할은
   부여하지 않습니다.
4. 서비스 계정의 **Keys > Add key > JSON**으로 키 파일을 내려받습니다.
5. Publication Sheet의 공유 설정에서 서비스 계정 이메일
   (`...@...iam.gserviceaccount.com`)을 **편집자**로 추가합니다.
6. 키 파일 전체를 Worker Secret으로 등록한 뒤, 내려받은 파일은 삭제합니다.

```bash
cd cloudflare/admin-api
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_KEY < 내려받은-키.json
npx wrangler deploy --env=""
```

Sheet ID와 탭 이름은 `wrangler.toml`의 `PUBLICATIONS_SHEET_ID`,
`PUBLICATIONS_SHEET_TAB`에 들어 있습니다. Sheet를 옮기면 이 두 값을 바꿉니다.

`/health`의 `publicationEditingConfigured`가 `true`이면 편집 준비가 끝난
상태입니다.

편집 보안 규칙은 다음과 같습니다.

- 읽기와 저장 모두 허용 목록의 Google 계정으로 로그인해야 합니다. 공유 접근
  키로는 편집할 수 없습니다.
- 값은 수식으로 해석되지 않도록 입력한 텍스트 그대로 저장됩니다.
- 편집기를 연 뒤 누군가 Sheet에서 같은 행을 고쳤다면 저장을 거부하고 최신
  내용을 다시 불러오게 합니다.
- `id`는 편집기에서 바꿀 수 없습니다. 새 행은 비워 두고 동기화가 정합니다.
- 행 삭제 기능은 없습니다. `홈페이지에 표시`를 끄면 `enabled`가 `FALSE`가
  되어 홈페이지에서만 숨겨집니다.
- Sheet 변경 기록에는 서비스 계정이 편집자로 남습니다. 실제로 저장한 운영자
  이메일은 Cloudflare Worker 로그(**Workers & Pages > aaig-admin-api > Logs**)의
  `publication.updated`, `publication.created` 항목에 기록됩니다.

## 8. 일반 운영

1. `/admin`에 운영자 Google 계정으로 로그인합니다.
2. Publication 관리에서 행을 검색해 `수정`하거나 `새 Publication 추가`를
   누릅니다.
3. 입력칸 아래 안내에 맞춰 값을 채우고 `Sheet에 저장`을 누릅니다. 잘못된 값은
   저장 전에 표시됩니다.
4. 저장하면 동기화가 자동으로 시작됩니다. 상태 표시가 `최근 동기화 성공`으로
   바뀌고 `검토 PR 열기`가 나타나면 PR의 추가·수정·삭제 내용을 검토합니다.
5. PR을 병합하고 Pages 배포 완료를 확인합니다.

Sheet를 직접 수정했다면 `/admin`의 `지금 동기화`를 누릅니다. 매일 한국시간
오전 11시 15분 무렵에도 같은 동기화가 자동 실행됩니다(GitHub 예약 실행은
몇 시간 늦어질 수 있습니다). 변경이 없으면 PR을 만들지 않습니다.

로그인이 만료되는 등 저장하지 못한 수정 내용은 같은 탭에서 다시 로그인하면
복구됩니다.

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
- `Duplicate id/title`: 중복된 제목과 직접 입력한 ID를 각각 정리합니다. 직접 입력한
  ID가 다른 행에서 자동 생성된 `sheet-...` 값과 같아도 충돌합니다.
- `returned 401/403`: CSV가 로그아웃 사용자에게 공개되는지 확인합니다.
- `Refusing to replace`: 대량 삭제가 의도된 것인지 먼저 검토합니다.
- 편집기의 `Publication 편집 설정이 필요합니다`: 7절의 서비스 계정 키가
  등록되지 않았거나 Google 로그인 설정이 빠졌습니다.
- 편집기의 `Google Sheet에 연결하지 못했습니다`: 서비스 계정이 Sheet 편집자로
  추가되었는지, Google Sheets API가 켜져 있는지 확인합니다.
- 편집기의 `그 사이 Sheet에서 이 행이 바뀌었습니다`: `최신 내용 불러오기`를
  누른 뒤 다시 수정합니다.
- 동기화 상태의 `GITHUB_ACTIONS_TOKEN을 등록해야 합니다`: 6절의 토큰이
  등록되지 않았습니다. 저장은 되지만 동기화는 매일 예약 실행 때 이루어집니다.

동기화 실패는 현재 배포 데이터에 영향을 주지 않습니다.

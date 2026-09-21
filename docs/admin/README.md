# AAIG 관리자 및 Cloudflare 연결 가이드

현재 구현은 다음 두 부분으로 나뉩니다.

- 공개 홈페이지: Cloudflare Web Analytics 비콘으로 방문 데이터를 전송합니다.
- `/admin`: Cloudflare Worker를 통해 집계 통계를 조회합니다. Publication 동기화는
  `Sync Publications from Google Sheets` 워크플로가 담당합니다.

`/admin` 통계는 Google 로그인으로 보호됩니다. 서버가 Google에 신분을 직접 확인한
뒤, 허용 목록에 있는 운영자 계정에만 통계를 내줍니다.

Cloudflare API 토큰, 관리자 접근 키, 허용 이메일 목록은 브라우저 번들에 포함하지
않습니다. Worker의 암호화된 secret으로만 저장합니다. Google 클라이언트 ID는 공개
식별자이므로 예외입니다.

## 1. Cloudflare Web Analytics 사이트 만들기

1. Cloudflare Dashboard의 **Analytics & Logs > Web Analytics**로 이동합니다.
2. `ajouaigroup.github.io`를 사이트로 추가합니다.
3. 발급된 JavaScript 비콘의 `token` 값을 복사합니다.
4. GitHub 저장소 **Settings > Secrets and variables > Actions > Variables**에 아래
   repository variable을 추가합니다.

```text
VITE_CLOUDFLARE_WEB_ANALYTICS_TOKEN=<비콘 token>
```

이 값은 방문 데이터를 보내는 공개 사이트 식별자입니다. Cloudflare API를 조회하는
비밀 토큰과는 다른 값입니다.

## 2. 통계 조회용 API 토큰 준비

Cloudflare에서 아래 권한만 가진 API token을 만듭니다.

```text
Account > Account Analytics > Read
```

함께 준비할 값은 다음과 같습니다.

- Cloudflare Account ID
- Web Analytics Site Tag
- 위에서 만든 API token
- 관리자가 입력할 충분히 긴 임의 접근 키

Site Tag는 비콘 token과 다른 식별자입니다. Web Analytics 사이트 화면의 URL에서
확인하거나 GraphQL에서 `dimensions { siteTag }`를 조회해 확인합니다.

관리자 접근 키는 다음처럼 생성할 수 있습니다.

```bash
openssl rand -base64 32
```

## 3. Google 로그인 준비

`/admin` 통계는 등록된 운영자 Google 계정으로만 열립니다. 공유 접근 키는 Google
로그인을 쓸 수 없을 때를 위한 예비 수단으로 당분간 함께 남겨둡니다.

### 3-1. OAuth 클라이언트 만들기

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트를
   선택하거나 새로 만듭니다.
2. **APIs & Services > OAuth consent screen**에서 동의 화면을 설정합니다.
   내부 운영자만 사용하므로 게시 상태는 테스트 또는 내부로 두어도 됩니다.
3. **APIs & Services > Credentials > Create credentials > OAuth client ID**에서
   애플리케이션 유형을 **웹 애플리케이션**으로 선택합니다.
4. **Authorized JavaScript origins**에 홈페이지 origin을 등록합니다.

```text
https://ajouaigroup.github.io
http://localhost:5173
```

5. 발급된 **클라이언트 ID**를 복사합니다. 이 값은 공개 식별자이므로 저장소와
   빌드 환경변수에 그대로 넣어도 됩니다. 클라이언트 보안 비밀번호는 이
   구조에서 사용하지 않습니다.

`Authorized redirect URIs`는 비워둡니다. 페이지를 떠나지 않고 ID 토큰만 받는
방식이라 리디렉션이 없습니다.

### 3-2. 허용할 운영자 이메일 정하기

통계를 볼 수 있는 계정을 쉼표로 구분해 준비합니다. 학교 계정 전체를 열지 않으므로
목록에 없는 주소는 로그인에 성공해도 통계를 볼 수 없습니다.

```text
operator@ajou.ac.kr,second-operator@ajou.ac.kr
```

운영자가 바뀌면 이 목록만 갱신하면 됩니다. 나머지 운영자는 아무 영향을 받지
않습니다.

## 4. Worker 배포

먼저 `cloudflare/admin-api/wrangler.toml`에서 두 값을 확인합니다.

- `ADMIN_ORIGIN`이 실제 홈페이지 origin과 맞는지. 커스텀 도메인을 사용한다면
  해당 origin을 쉼표로 추가합니다.
- `GOOGLE_CLIENT_ID`에 3단계에서 발급받은 클라이언트 ID를 넣었는지. 비워두면
  Google 로그인이 꺼지고 접근 키만 동작합니다.

그다음 Worker 디렉터리에서 아래 명령을 실행합니다.

```bash
cd cloudflare/admin-api
npx wrangler login
npx wrangler secret put CLOUDFLARE_API_TOKEN
npx wrangler secret put CLOUDFLARE_ACCOUNT_ID
npx wrangler secret put CLOUDFLARE_SITE_TAG
npx wrangler secret put ADMIN_ALLOWED_EMAILS
npx wrangler secret put ADMIN_TOKEN
npx wrangler secret put GITHUB_ACTIONS_TOKEN
npx wrangler deploy --env=""
```

배포가 끝나면 출력된 `https://...workers.dev` 주소를 복사합니다.

로컬 Worker 테스트에는 production origin을 변경하지 않고 dev 환경을 사용합니다.
업로드한 Worker Secret은 로컬 실행에 전달되지 않으므로, 다음 내용을
`cloudflare/admin-api/.dev.vars`에 별도로 작성합니다. 이 파일은 Git에서
무시되며 실제 값을 커밋하거나 공유하지 않습니다.

```dotenv
CLOUDFLARE_API_TOKEN="통계 조회용 API 토큰"
CLOUDFLARE_ACCOUNT_ID="Cloudflare Account ID"
CLOUDFLARE_SITE_TAG="Web Analytics Site Tag"
ADMIN_ALLOWED_EMAILS="operator@ajou.ac.kr"
ADMIN_TOKEN="로컬에서 입력할 관리자 접근 키"
```

그다음 Worker 디렉터리에서 실행합니다.

```bash
npx wrangler dev --env dev
```

로컬에서 Publication 동기화 API까지 시험할 때만 `.dev.vars`에
`GITHUB_ACTIONS_TOKEN`을 추가합니다. 통계 조회만 확인할 때는 필요하지 않습니다.

## 5. 홈페이지와 Worker 연결

GitHub 저장소의 Actions repository variable에 Worker 주소를 추가합니다.

```text
VITE_ADMIN_API_URL=https://aaig-admin-api.<account-subdomain>.workers.dev
VITE_GOOGLE_CLIENT_ID=<Google OAuth 클라이언트 ID>
VITE_PUBLICATIONS_SHEET_URL=https://docs.google.com/spreadsheets/d/<spreadsheet-id>/edit
```

`main` 브랜치를 다시 배포한 뒤 `/admin`에 접속합니다. Google 로그인 버튼을 눌러
허용 목록에 있는 계정으로 로그인하면 최근 7일 또는 30일 통계를 확인할 수
있습니다.

로그인은 1시간 동안 유지되고, 만료되면 화면이 스스로 잠깁니다. 자격 증명은
브라우저에 저장되지 않으므로 새로고침하면 세션이 끝납니다. 이미 동의한 계정은
Google이 조용히 다시 로그인시켜 주므로 실제 사용에는 불편이 없습니다.

`VITE_GOOGLE_CLIENT_ID`를 등록하기 전에는 로그인 버튼 대신 안내 문구가 표시되며,
`접근 키로 열기`를 펼쳐 기존 방식으로 확인할 수 있습니다.

로컬에서는 `.env.example`을 `.env.local`로 복사하고 값을 채운 뒤 개발 서버를
시작합니다. `.env.local`은 커밋하지 않습니다.

## 6. Publication 동기화 권한

Publication 동기화는 `Sync Publications from Google Sheets` 워크플로가 매일
자동으로 수행하며, 검증에 성공한 변경은 검토용 PR로 생성됩니다. 관리자 화면에는
동기화 버튼이 없습니다.

Worker에는 같은 워크플로를 호출하는 API(`POST /v1/publications/sync`)가 남아
있습니다. 지금은 화면에서 쓰지 않으므로, `GITHUB_ACTIONS_TOKEN`은 이 API를 실제로
쓸 때만 등록하면 됩니다. 등록한다면 대상 저장소의 Actions `Read and write` 권한만
부여합니다. Google Sheet와 GitHub Variables 설정은
`docs/publications/google-sheets.md`를 따릅니다.

`/health`의 `publicationSyncConfigured`가 `true`이면 Worker의 GitHub 연동이
준비된 상태입니다.

## 7. 현재 보안 범위와 다음 단계

통계 API는 Google 로그인으로 보호됩니다. Worker는 받은 ID 토큰의 서명을 Google의
공개 키로 직접 검증하고, 발급자와 대상 클라이언트 ID, 만료 시각, 이메일 확인
여부를 모두 확인한 뒤 허용 목록과 대조합니다. 확인되지 않은 이메일은 문자열이
일치해도 통과하지 못합니다.

공유 접근 키(`ADMIN_TOKEN`)는 예비 수단으로 함께 남아 있습니다. Google 로그인이
자리를 잡으면 secret을 삭제하는 것을 권장합니다. 삭제해도 Google 로그인만으로
Worker는 정상 동작합니다.

API 토큰과 허용 이메일 목록은 Worker 밖으로 노출되지 않으며, 허용된 origin만 API를
호출할 수 있습니다. 잘못된 로그인 시도는 IP와 API 경로별로 분당 10회까지
허용합니다. 정상 요청은 이 제한에 포함되지 않습니다. Rate Limiting binding은
`wrangler.toml`에 선언되어 Worker 배포 시 함께 적용됩니다.

남아 있는 한계는 `/admin` 페이지 자체입니다. GitHub Pages는 정적 호스팅이라 페이지
파일을 내려받는 것 자체는 막을 수 없습니다. 로그인 전 화면에는 비밀 정보가 없고
통계도 표시되지 않지만, 진입 자체를 차단하려면 커스텀 도메인과 Cloudflare Access가
필요합니다. Publication 변경 이력은 Google Sheet 편집 기록과 GitHub PR 기록으로
남습니다.

## 8. 확인 항목

1. `https://<worker-address>/health`가 `configured: true`와
   `googleSignInConfigured: true`를 반환하는지 확인합니다.
2. 공개 홈페이지 방문 후 Cloudflare Dashboard에 데이터가 들어오는지 확인합니다.
3. `/admin`이 검색엔진에 노출되지 않고 공개 내비게이션에도 나타나지 않는지 확인합니다.
4. 허용 목록에 있는 계정으로 로그인하면 통계가 보이는지 확인합니다.
5. 허용 목록에 없는 Google 계정으로 로그인하면 `이 계정에는 관리자 권한이 없습니다`가
   표시되고 통계가 반환되지 않는지 확인합니다.
6. 로그아웃 후 다른 계정으로 다시 로그인할 수 있는지 확인합니다.
7. GitHub Actions의 Content Build Check와 Deploy GitHub Pages가 성공하는지 확인합니다.

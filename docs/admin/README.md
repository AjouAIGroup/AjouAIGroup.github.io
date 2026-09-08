# AAIG 관리자 및 Cloudflare 연결 가이드

현재 구현은 다음 두 부분으로 나뉩니다.

- 공개 홈페이지: Cloudflare Web Analytics 비콘으로 방문 데이터를 전송합니다.
- `/admin`: Cloudflare Worker를 통해 집계 통계를 조회하고 publication 현황을 확인합니다.

Cloudflare API 토큰과 관리자 접근 키는 브라우저 번들에 포함하지 않습니다. Worker의
암호화된 secret으로만 저장합니다.

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

## 3. Worker 배포

먼저 `cloudflare/admin-api/wrangler.toml`의 `ADMIN_ORIGIN`이 실제 홈페이지 origin과
맞는지 확인합니다. 커스텀 도메인을 사용한다면 해당 origin을 쉼표로 추가합니다.

그다음 Worker 디렉터리에서 아래 명령을 실행합니다.

```bash
cd cloudflare/admin-api
npx wrangler login
npx wrangler secret put CLOUDFLARE_API_TOKEN
npx wrangler secret put CLOUDFLARE_ACCOUNT_ID
npx wrangler secret put CLOUDFLARE_SITE_TAG
npx wrangler secret put ADMIN_TOKEN
npx wrangler deploy
```

배포가 끝나면 출력된 `https://...workers.dev` 주소를 복사합니다.

로컬 Worker 테스트에는 production origin을 변경하지 않고 dev 환경을 사용합니다.

```bash
npx wrangler dev --env dev
```

## 4. 홈페이지와 Worker 연결

GitHub 저장소의 Actions repository variable에 Worker 주소를 추가합니다.

```text
VITE_ADMIN_API_URL=https://aaig-admin-api.<account-subdomain>.workers.dev
```

`main` 브랜치를 다시 배포한 뒤 `/admin`에 접속합니다. `ADMIN_TOKEN`에 등록한 접근
키를 입력하면 최근 7일 또는 30일 통계를 확인할 수 있습니다. 접근 키는
`sessionStorage`에만 저장되므로 브라우저 탭을 닫으면 사라집니다.

로컬에서는 `.env.example`을 `.env.local`로 복사하고 두 값을 채운 뒤 개발 서버를
시작합니다. `.env.local`은 커밋하지 않습니다.

## 5. 현재 보안 범위와 다음 단계

현재 단계는 소수 운영자를 위한 공유 접근 키 방식입니다. API 토큰은 Worker 밖으로
노출되지 않으며 허용된 origin만 API를 호출할 수 있습니다.

관리자별 계정, 권한 회수, 변경 이력이 필요해지면 다음 단계에서 GitHub OAuth 또는
Cloudflare Access로 교체합니다. Publication 추가와 수정은 GitHub PR을 생성하도록
연결하면 기존 Markdown 검증 및 배포 흐름을 그대로 유지할 수 있습니다.

## 6. 확인 항목

1. `https://<worker-address>/health`가 `configured: true`를 반환하는지 확인합니다.
2. 공개 홈페이지 방문 후 Cloudflare Dashboard에 데이터가 들어오는지 확인합니다.
3. `/admin`이 검색엔진에 노출되지 않고 공개 내비게이션에도 나타나지 않는지 확인합니다.
4. 관리자 접근 키가 잘못됐을 때 통계가 반환되지 않는지 확인합니다.
5. GitHub Actions의 Content Build Check와 Deploy GitHub Pages가 성공하는지 확인합니다.

# AAIG 홈페이지

AAIG(아주대학교 인공지능 그룹)의 네 연구실을 소개하는 웹사이트입니다.

## 개발

```bash
npm ci
npm run dev
```

`npm run build`는 Research, News, Publication, Gallery 콘텐츠를 확인한 뒤 프로덕션 번들을 만듭니다.

## 콘텐츠

| 콘텐츠 | 원본 위치 |
| --- | --- |
| News | `content/news` |
| Publication | `content/publications` |
| Gallery | `content/photos` |
| Research | `src/assets/dataset/research_*.json` |

콘텐츠를 바꾼 뒤에는 아래를 실행합니다.

```bash
npm run content:sync
npm run build
```

### 직접 콘텐츠 추가하기

코드를 수정하지 않아도 Markdown 파일만 추가하면 News와 Publications가 갱신됩니다.

1. News는 `content/news/_template.md`를 복사해 `content/news/YYYY-제목.md`로 저장합니다.
2. Publications는 `content/publications/_template.md`를 복사해 맞는 카테고리 폴더에 저장합니다.
3. Publication에는 `labs: [CVL Lab]`처럼 연구실 태그를 반드시 넣습니다. 여러 연구실이 함께 참여했다면 배열에 모두 적습니다.
4. 사진은 `content/photos/_README.md`의 절차를 따릅니다.
5. 저장 뒤 아래 명령으로 생성 데이터와 화면을 확인합니다.

```bash
npm run content:sync
npm run validate:content
npm run build
```

`src/generated` 파일은 직접 수정하지 않습니다. 더 자세한 필드 설명은 [News 가이드](docs/news/README.md), [Publication 가이드](docs/publications/README.md)를 참고하세요.

## 배포

`main`에 반영되면 GitHub Actions가 GitHub Pages용 정적 사이트를 빌드하여 `gh-pages` 브랜치에 배포합니다.

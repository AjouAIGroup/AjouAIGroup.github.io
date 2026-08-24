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

## 배포

`main`에 반영되면 GitHub Actions가 GitHub Pages용 정적 사이트를 빌드하여 `gh-pages` 브랜치에 배포합니다.

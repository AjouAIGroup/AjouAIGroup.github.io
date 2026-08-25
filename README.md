# AAIG 홈페이지

AAIG(아주대학교 인공지능 그룹)의 네 연구실을 소개하는 웹사이트입니다.

## 개발

```bash
npm ci
npm run dev
```

`npm run build`는 Research, News, Publication 콘텐츠를 확인한 뒤 프로덕션 번들을 만듭니다.

## 콘텐츠

| 콘텐츠 | 원본 위치 |
| --- | --- |
| News | `content/news` |
| Publication | `content/publications` |
| Research | `src/assets/dataset/research_*.json` |
| Conference Calendar | `content/deadlines/venues.json` |
| External source registry/cache | `content/sources` |

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
4. Publication의 `venue`는 `CVPR 2026`처럼 **학회/저널 약자 + 연도** 형식으로 입력합니다. 워크숍 논문은 본 학회와 구분해 `CVPR Workshop 2026`처럼 입력합니다.
5. 사진은 `content/photos/_README.md`의 절차를 따릅니다.
6. Conference Calendar는 `content/deadlines/venues.json`에서 관리합니다. 학회와 마일스톤을 수정한 뒤에는 ISO 형식의 `deadline_at`과 공식 CFP 링크를 확인합니다.
7. 저장 뒤 아래 명령으로 생성 데이터와 화면을 확인합니다.

```bash
npm run content:sync
npm run validate:content
npm run build
```

`src/generated` 파일은 직접 수정하지 않습니다. 더 자세한 필드 설명은 [News 가이드](docs/news/README.md), [Publication 가이드](docs/publications/README.md)를 참고하세요.

### 공식 사이트 자동 수집

`content/sources/labs.json`에는 각 연구실의 공식 뉴스·논문 URL과 수집 방식이 있습니다. 매주 수요일 GitHub Actions가 다음을 수행합니다.

1. 공식 사이트에서 수집 가능한 News와 Publications를 가져와 `content/sources/cache`에 정규화합니다.
2. 공식 CFP 페이지에서 검증 가능한 Conference 마감일을 갱신합니다.
3. 변경사항을 바로 공개하지 않고 검토용 Pull Request로 만듭니다. PR을 병합하면 기존 배포 파이프라인이 사이트를 공개합니다.

로컬에서 같은 과정을 실행하려면 다음 명령을 사용합니다.

```bash
npm run content:refresh
npm run validate:content
npm run build
```

수집에 실패하거나 소스가 구조적으로 바뀌면 기존 캐시를 유지합니다. 로컬 실행 시에는 `content/sources/cache/last-sync-report.json`에서 상태를 볼 수 있고, 정기 실행 상태는 GitHub Actions 로그에서 확인합니다. 현재 날짜가 있는 공식 아카이브가 없는 소스(CVL News, SAIL News)는 잘못된 자동 게시를 막기 위해 레지스트리에서 비활성화되어 있습니다. 날짜가 있는 News/Publication URL이 준비되면 해당 항목의 `enabled`를 `true`로 바꾸고 맞는 adapter를 추가합니다.

## 배포

`main`에 반영되면 GitHub Actions가 GitHub Pages용 정적 사이트를 빌드하여 `gh-pages` 브랜치에 배포합니다.

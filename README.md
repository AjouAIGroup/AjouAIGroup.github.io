# AAIG 홈페이지

AAIG(아주대학교 인공지능 그룹)의 다섯 연구실을 소개하는 웹사이트입니다.

## 개발

```bash
npm ci
npm run dev
```

`npm run build`는 Research, News, Publication 콘텐츠를 확인한 뒤 프로덕션 번들을 만듭니다.

### 검사 명령

CI가 실행하는 것과 같은 명령입니다.

| 명령                       | 설명                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `npm run format`           | Prettier로 전체 코드를 정리합니다.                                                     |
| `npm run format:check`     | 포맷이 어긋난 파일이 있으면 실패합니다.                                                |
| `npm run lint`             | ESLint를 실행합니다.                                                                   |
| `npm run validate:content` | 콘텐츠를 파싱해 검증만 하고 파일은 쓰지 않습니다.                                      |
| `npm run content:check`    | 동기화 후 `src/generated`와 `public/uploads`에 커밋되지 않은 변경이 남으면 실패합니다. |

## 콘텐츠

| 콘텐츠                         | 원본 위치                            |
| ------------------------------ | ------------------------------------ |
| News                           | `content/news`                       |
| Publication                    | `content/publications`               |
| Research                       | `src/assets/dataset/research_*.json` |
| Photo                          | `content/photos/raw`                 |
| Conference Calendar            | `content/deadlines/venues.json`      |
| External source registry/cache | `content/sources`                    |

콘텐츠를 바꾼 뒤에는 아래를 실행합니다.

```bash
npm run content:sync
npm run build
```

### 직접 콘텐츠 추가하기

코드를 수정하지 않아도 Markdown 파일만 추가하면 News와 Publications가 갱신됩니다.

1. News는 `content/news/_template.md`를 복사해 `content/news/YYYY-제목.md`로 저장합니다.
2. Publications는 `content/publications/_template.md`를 복사해 맞는 카테고리 폴더에 저장합니다.
3. Publication에는 `labs: [MMAI Lab]`처럼 연구실 태그를 반드시 넣습니다. 여러 연구실이 함께 참여했다면 배열에 모두 적습니다.
4. Publication의 `venue`는 `CVPR 2026`처럼 **학회/저널 약자 + 연도** 형식으로 입력합니다. 워크숍 논문은 본 학회와 구분해 `CVPR Workshop 2026`처럼 입력합니다.
5. 사진은 `content/photos/_README.md`의 절차를 따릅니다.
6. Conference Calendar는 `content/deadlines/venues.json`에서 관리합니다. 학회와 마일스톤을 수정한 뒤에는 ISO 형식의 `deadline_at`과 공식 CFP 링크를 확인합니다.
7. 저장 뒤 아래 명령으로 생성 데이터와 화면을 확인합니다.

```bash
npm run content:sync
npm run validate:content
npm run build
```

`src/generated` 파일은 직접 수정하지 않습니다. 같은 콘텐츠에서는 항상 같은 결과가 나오므로, 동기화를 빠뜨리면 `npm run content:check`가 CI에서 이를 잡아냅니다. `public/uploads/photos`도 동기화가 관리합니다. 이벤트 폴더 이름을 바꾸면 이전 산출물은 자동으로 정리됩니다. 더 자세한 필드 설명은 [News 가이드](docs/news/README.md), [Publication 가이드](docs/publications/README.md)를 참고하세요.

## UI 구성 원칙

AAIG는 콘텐츠를 훑어보는 화면과 읽는 화면을 의도적으로 다르게 구성합니다. 새 섹션이나 페이지를 추가할 때 아래 규칙을 따릅니다.

| 상황                                            | 사용할 구성                     | 예시                                               |
| ----------------------------------------------- | ------------------------------- | -------------------------------------------------- |
| 서로 다른 항목을 빠르게 비교하거나 더 찾아볼 때 | 가로 스크롤 카드                | Home의 News, Publications, Research Areas          |
| 짧은 요약·이미지·링크가 한 묶음으로 동작할 때   | 카드                            | Home의 carousel 항목, 히어로의 Lab 링크            |
| 긴 텍스트·저자·마감일처럼 순서대로 읽어야 할 때 | 열린 목록과 여백, 절제된 구분선 | Publication archive, News archive, Calendar, Apply |
| 필터·검색처럼 조작이 목적일 때                  | 카드가 아닌 툴바                | Publication과 Calendar의 controls                  |

- 카드에는 하나의 명확한 클릭 목적만 둡니다. 카드 안에 중첩된 버튼이나 링크를 만들지 않습니다.
- Home의 가로 레일은 `scroll-snap`, 키보드 좌우 화살표, 별도 이전/다음 버튼을 함께 유지합니다. 작은 화면에서는 버튼을 레일 아래로 옮겨 콘텐츠를 가리지 않게 합니다.
- 서브 페이지에서 장식용 카드·테두리·그림자만으로 정보를 나누지 않습니다. 제목, 간격, 한 줄 구분선으로 읽는 순서를 만듭니다.
- 반응형 확인 기준은 1440px, 1180px, 768px, 390px입니다. 히어로 연구실 카드의 텍스트 겹침, 가로 레일의 버튼 겹침, 문서 전체의 가로 오버플로우를 확인합니다.

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

수집에 실패하거나 소스가 구조적으로 바뀌면 기존 캐시를 유지합니다. 로컬 실행 시에는 `content/sources/cache/last-sync-report.json`에서 상태를 볼 수 있고, 정기 실행 상태는 GitHub Actions 로그에서 확인합니다. 현재 날짜가 있는 공식 아카이브가 없는 소스(MMAI Lab News, SAIL News)는 잘못된 자동 게시를 막기 위해 레지스트리에서 비활성화되어 있습니다. 날짜가 있는 News/Publication URL이 준비되면 해당 항목의 `enabled`를 `true`로 바꾸고 맞는 adapter를 추가합니다.

## 배포

`main`에 반영되면 GitHub Actions가 `npm run build:static`으로 라우트별 정적 HTML을 만들어 `gh-pages` 브랜치에 배포합니다. 각 페이지는 고유한 `<title>`, `description`, `canonical`, Open Graph 태그를 갖습니다.

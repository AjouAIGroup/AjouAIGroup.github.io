# Publication Operations Guide

Publication의 원본은 공개 읽기 가능한 Google Sheet입니다. 승인된 관리자만
Sheet를 수정하며, 홈페이지는 검증을 통과한 GitHub 스냅샷을 사용합니다.

전체 설정과 운영 절차는 [`google-sheets.md`](google-sheets.md)를 확인합니다.

## 현재 경로

- 원본: 관리자용 Google Sheet
- 가져오기 CSV: `docs/publications/publications-sheet-import.csv`
- 배포 스냅샷: `content/publications/sheet.snapshot.json`
- 생성 데이터: `src/generated/publications.generated.json`
- 자동 생성 News: `src/generated/news.generated.json`

스냅샷과 생성 JSON은 직접 수정하지 않습니다. Sheet 변경 후 관리자 페이지의
`동기화 PR 만들기`를 사용합니다.

## Legacy Markdown

`content/publications/<category>/*.md`와 `_template.md`는 전환 전 데이터의
복구·비교를 위해 당분간 보존합니다. Sheet snapshot이 존재하는 동안 일반
동기화에서는 읽지 않습니다.

## 로컬 검사

```bash
npm run publications:sheet:check
npm run content:sync
npm run validate:content
npm run build:static
```

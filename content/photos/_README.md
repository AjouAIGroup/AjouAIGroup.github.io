Photo 운영 규칙(요약):

1. 원본 이미지는 `content/photos/raw/<category>/<YYYY-MM-DD>__<slug>/` 아래에 넣는다.
2. 파일명은 자유지만 날짜/slug가 폴더명에 포함되면 자동 인식된다.
3. 선택 메타데이터는 `content/photos/metadata.json`에 넣는다.
   - 샘플 형식: `content/photos/metadata.template.json`
4. 동기화 명령:
   - `npm run photos:sync`
   - 또는 전체 동기화 `npm run content:sync`

생성 결과:
- `public/uploads/photos/...` (리사이즈/최적화 산출물)
- `src/generated/photos.generated.json` (갤러리/라이트박스 manifest)

동기화는 `public/uploads/photos`를 원본과 정확히 맞춥니다. 이벤트 폴더 이름이나
`metadata.json`의 날짜/slug를 바꾸면 이전 산출물은 자동으로 삭제되므로, 이 폴더에
직접 파일을 넣어두면 안 됩니다. 출력 파일명은 원본 파일명에서 나오기 때문에 사진을
추가해도 기존 사진의 경로는 바뀌지 않습니다.

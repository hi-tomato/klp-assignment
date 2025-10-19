## **Feature-6/feed-api-integration**

Feed API 통합 및 이미지 업로드 기능 구현

### 구현 완료

#### Feed (게시글) CRUD

- [x] **usePost.ts** - 게시글 생성
- [x] **useGetPost.ts** - 게시글 조회
- [x] **useUpdatePost.ts** - 게시글 수정
- [x] **useDeletePost.ts** - 게시글 삭제

#### Comment (댓글) CRUD

- [x] **useAddComment.ts** - 댓글 추가
- [x] **useGetComments.ts** - 댓글 조회
- [x] **useUpdateComment.ts** - 댓글 수정
- [x] **useDeleteComment.ts** - 댓글 삭제

#### Like (좋아요)

- [x] **useLike.ts** - 좋아요 추가/삭제/조회

#### Image Upload (이미지 업로드)

- [x] **useImageUploader.ts** - 이미지 선택 및 업로드
- [x] **ImagePreview.tsx** - 이미지 미리보기
- [x] **ImageViewerScreen** - 이미지 전체화면 보기
- [x] **FeedFooter.tsx** - 이미지 업로드 UI

### 주요 기능

- Firebase Storage 연동
- 다중 이미지 선택 및 업로드
- 실시간 이미지 미리보기
- 이미지 뷰어

# KLP Assignment - SNS 과제 (소셜 앱)

KLP 과제 유형으로 제작된 SNS 커뮤니티 어플리케이션입니다.
파이어베이스를 사용하여 회원가입 및 로그인, 피드와 댓글 CRUD, 이미지 업로드를 기능을 구현하였습니다.

---

## 🛠 기술 스택

### Frontend

- **React Native** `0.81.4`
- **Expo** `~54.0.13`
- **Expo Router** `~6.0.11` - 파일 기반 라우팅
- **TypeScript** `~5.9.2`

### 상태 관리

- **Zustand** `^5.0.8` - 전역 상태 관리 (인증, 다크모드)
- **React Hook Form** `^7.65.0` - 폼 상태 관리 및 유효성 검사

### Backend & Database

- **Firebase**
  - Authentication - 이메일/비밀번호 인증
  - Firestore - 실시간 데이터베이스
  - Storage - 이미지 업로드/관리

### UI/UX 라이브러리

- **React Native Safe Area Context** - 안전 영역 처리
- **React Native Keyboard Controller** - 키보드 제어
- **React Native Toast Message** - 토스트 알림
- **Expo Action Sheet** - 액션 시트
- **Expo Notifications** - 푸시 알림

### 개발 도구

- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit 린팅

---

## ✨ 주요 기능

### 1. 사용자 인증 (Authentication)

- 이메일/비밀번호 회원가입
- 로그인/로그아웃
- 유효성 검사 (이메일 형식, 비밀번호 강도)
- 보호된 라우트 (AuthRoutes HOC)

### 2. 피드 (Feed)

- 게시글 목록 조회 (실시간)
- 게시글 작성/수정/삭제
- 다중 이미지 업로드 (최대 5장)
- 이미지 미리보기 및 전체화면 보기
- 게시글 검색 기능 (제목/내용 검색, 디바운싱 적용)

### 3. 소셜 기능

- 댓글 작성/수정/삭제
- 좋아요 추가/취소
- 게시글 공유 (Share API)
- 실시간 카운트 업데이트 (좋아요, 댓글 수)

### 4. 마이페이지

- 프로필 조회
- 프로필 편집 (닉네임, 소개, 프로필 사진)
- 내가 작성한 게시글 목록
- 이미지 업로드 (프로필 사진)

### 5. 설정

- **다크모드 지원** (Light/Dark Theme)
- 설정 저장 (AsyncStorage)
- 계정 정보 확인
- 로그아웃

### 6. 푸시 알림

- Expo Notifications 연동
- 푸시 토큰 발급
- 알림 권한 관리

---

## 📁 프로젝트 구조

```
klp-assignment/
├── app/                          # 라우트 (Expo Router)
│   ├── (tabs)/                   # 탭 네비게이션
│   │   ├── index.tsx             # 피드 화면
│   │   ├── mypage.tsx            # 마이페이지
│   │   └── setting.tsx           # 설정 화면
│   ├── auth/                     # 인증 관련
│   │   ├── index.tsx             # 인증 시작 화면
│   │   ├── login.tsx             # 로그인
│   │   └── signup.tsx            # 회원가입
│   ├── post/                     # 게시글 관련
│   │   ├── [id].tsx              # 게시글 상세
│   │   └── write.tsx             # 게시글 작성/수정
│   ├── mypage/                   # 마이페이지 관련
│   │   └── setting.tsx           # 프로필 편집
│   └── _layout.tsx               # 루트 레이아웃
│
├── components/                   # 재사용 가능한 컴포넌트
│   ├── common/                   # 공통 컴포넌트
│   │   ├── CustomButton.tsx      # 커스텀 버튼
│   │   ├── FixedButtonCTA.tsx    # 하단 고정 버튼
│   │   └── InputField.tsx        # 입력 필드
│   ├── feed/                     # 피드 관련 컴포넌트
│   │   ├── FeedItem.tsx          # 피드 아이템
│   │   ├── FeedList.tsx          # 피드 목록
│   │   ├── FeedSearchBar.tsx     # 검색 바
│   │   ├── CommentItem.tsx       # 댓글 아이템
│   │   ├── ImagePreview.tsx      # 이미지 미리보기
│   │   ├── Profile.tsx           # 프로필 컴포넌트
│   │   └── FeedFooter.tsx        # 피드 푸터 (이미지 업로드)
│   ├── input/                    # 입력 컴포넌트
│   │   ├── EmailInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── PasswordConfirmInput.tsx
│   │   ├── DisplayNameInput.tsx
│   │   ├── IntroduceInput.tsx
│   │   ├── TitleInput.tsx
│   │   └── ContentInput.tsx
│   └── AuthRoutes.tsx            # 인증 보호 HOC
│
├── hooks/                        # Custom Hooks
│   ├── useSignUp.ts              # 회원가입
│   ├── usePost.ts                # 게시글 작성
│   ├── useGetPost.ts             # 게시글 조회
│   ├── useUpdatePost.ts          # 게시글 수정
│   ├── useSearchPosts.ts         # 게시글 검색
│   ├── useAddComment.ts          # 댓글 추가
│   ├── useGetComments.ts         # 댓글 조회
│   ├── useUpdateComment.ts       # 댓글 수정
│   ├── useDeleteComment.ts       # 댓글 삭제
│   ├── useLike.ts                # 좋아요
│   ├── useImageUploader.ts       # 이미지 업로드
│   ├── useGetUserProfile.ts      # 사용자 프로필 조회
│   ├── useUpdateProfile.ts       # 프로필 업데이트
│   └── useNotifications.ts       # 푸시 알림
│
├── store/                        # 전역 상태 관리 (Zustand)
│   ├── useAuthStore.ts           # 인증 상태
│   └── useDarkModeStore.ts       # 다크모드 상태
│
├── lib/                          # 외부 라이브러리 설정
│   └── firebase.ts               # Firebase 설정
│
├── constants/                    # 상수
│   ├── colors.ts                 # 색상 테마 (Light/Dark)
│   └── validation.ts             # 유효성 검사 규칙
│
├── util/                         # 유틸리티 함수
│   ├── getColors.ts              # 다크모드 색상 헬퍼
│   └── timeago.ts                # 시간 포맷팅
│
├── types/                        # TypeScript 타입 정의
│   └── index.ts                  # 공통 타입
│
└── assets/                       # 정적 리소스
    └── images/                   # 이미지 파일
```

---

## 개발 과정

### 1. 프로젝트 초기 설정

- Firebase 프로젝트 생성 및 설정
- ESLint, Prettier 설정
- Husky, Lint-staged 설정 (Pre-commit hooks)
- TypeScript 타입 정의

### 2: 공통 컴포넌트 개발

- CustomButton 컴포넌트
- InputField 컴포넌트
- FixedButtonCTA 컴포넌트

### 3. 인증 기능

- 인증 페이지 라우팅 설정
- 로그인/회원가입 UI 구현
- React Hook Form 연동
- Firebase Authentication 연동
- Zustand를 통한 전역 인증 상태 관리
- AuthRoutes HOC 구현

### 4. 피드 기능 개발

- 피드 컴포넌트 구현 (Profile, FeedItem, FeedList)
- 게시글 CRUD 기능
- 댓글 CRUD 기능
- 좋아요 기능
- 게시글 검색 기능 (디바운싱)

### 5. 이미지 업로드

- Expo Image Picker 연동
- Firebase Storage 설정
- 다중 이미지 업로드 Hook
- 이미지 미리보기 컴포넌트
- 이미지 전체화면 뷰어

### 6: 스타일링 및 UX 개선

- 색상 시스템 구축 (constants/colors.ts)
- 키보드 컨트롤러 적용
- Toast 알림 추가
- Action Sheet 적용
- 스타일 가이드 문서 작성

### 7. 마이페이지

- 마이페이지 UI 구현
- 프로필 조회 기능
- 프로필 편집 기능
- 내 게시글 목록 조회
- 설정 페이지

### 8. 푸시 알림

- Expo Notifications 설정
- 푸시 토큰 발급
- 알림 권한 요청

### 9 다크모드 구현 (Day 5)

- AsyncStorage를 활용한 설정 저장
- useDarkModeStore (Zustand) 구현
- 다크모드 색상 시스템 구축
- getColors 유틸리티 함수
- 다크모드 토글 스위치
- 모든 화면 다크모드 적용
  - 레이아웃 컴포넌트
  - 공통 컴포넌트
  - 피드 화면
  - 인증 화면
  - 마이페이지
  - 설정 화면

---

## 💻 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Expo CLI
- iOS Simulator (macOS) 또는 Android Emulator

### 설치

```bash
# 저장소 클론
git clone [repository-url]

# 디렉토리 이동
cd klp-assignment

# 의존성 설치
npm install
```

### 실행

```bash
# 개발 서버 시작
npm start

# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹에서 실행
npm run web
```

### 코드 품질 도구

```bash
# 린트 검사
npm run lint

# 포맷팅
npm run format

# 포맷 검사
npm run format:check

# 타입 체크
npm run type-check
```

---

### 디자인 패턴

#### 1. Custom Hooks 패턴

모든 비즈니스 로직을 Custom Hooks로 분리하여 재사용성과 테스트 가능성을 높였습니다.

```typescript
// hooks/usePost.ts
export const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (data: PostData) => {
    // Firebase Firestore 로직
  };

  return { createPost, isLoading };
};
```

#### 2. Compound Component 패턴

InputField와 같은 복잡한 컴포넌트는 여러 하위 컴포넌트로 구성하여 유연성을 높였습니다.

```typescript
// components/input/EmailInput.tsx
export default function EmailInput() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="email"
      rules={emailValidation}
      render={({ field, fieldState }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력하세요"
          errorMessage={fieldState.error?.message}
          {...field}
        />
      )}
    />
  );
}
```

#### 3. HOC (Higher-Order Component) 패턴

인증이 필요한 페이지를 보호하기 위해 AuthRoutes HOC를 구현했습니다.

```typescript
// components/AuthRoutes.tsx
export default function AuthRoutes({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  if (!user?.email) {
    return <Redirect href="/auth" />;
  }

  return <>{children}</>;
}
```

#### 4. Container/Presenter 패턴

UI와 로직을 분리하여 관심사를 명확히 구분했습니다.

### 상태 관리 전략

#### Zustand (전역 상태)

- 인증 상태 (`useAuthStore`)
- 다크모드 설정 (`useDarkModeStore`)

#### React Hook Form (로컬 폼 상태)

- 로그인/회원가입 폼
- 게시글 작성/수정 폼
- 프로필 편집 폼

#### Firebase Realtime (서버 상태)

- Firestore 실시간 구독으로 게시글, 댓글 자동 업데이트

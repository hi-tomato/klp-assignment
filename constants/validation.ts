export const VALIDATION = {
  EMAIL_REQUIRED: (data: string) => {
    if (!data || data.length === 0) {
      return "이메일을 입력해주세요.";
    }
  },
  EMAIL_VALID: (data: string) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)) {
      return "이메일 형식이 올바르지 않습니다.";
    }
  },
  PASSWORD_REQUIRED: (data: string) => {
    if (data.length === 0) {
      return "비밀번호를 입력해주세요.";
    }
  },
  PASSWORD_VALID: (data: string) => {
    if (!/[a-zA-Z]/.test(data) && !/[0-9]/.test(data)) {
      return "비밀번호는 영문자와 숫자를 포함해야 합니다.";
    }
  },
};

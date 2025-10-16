import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const useSignUp = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("회원가입 성공: " + userCredential.user.email);
      return userCredential;
    } catch (err) {
      setError(err as Error);
      console.error("회원가입 실패:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, error, isLoading };
};

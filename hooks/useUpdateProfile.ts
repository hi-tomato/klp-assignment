import { auth, db } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

interface UpdateProfileParams {
  displayName?: string;
  photoURL?: string;
  introduce?: string;
}

export const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserProfile = async (params: UpdateProfileParams) => {
    if (!auth.currentUser) {
      throw new Error("로그인이 필요합니다.");
    }

    setIsLoading(true);
    setError(null);

    try {
      if (params.displayName !== undefined || params.photoURL !== undefined) {
        await updateProfile(auth.currentUser, {
          displayName: params.displayName ?? auth.currentUser.displayName,
          photoURL: params.photoURL ?? auth.currentUser.photoURL,
        });
      }

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          displayName: params.displayName ?? auth.currentUser.displayName,
          photoURL: params.photoURL ?? auth.currentUser.photoURL,
          introduce: params.introduce ?? "",
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      console.log("프로필 업데이트 성공");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "프로필 업데이트 실패";
      setError(errorMessage);
      console.error("프로필 업데이트 실패:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateUserProfile };
};

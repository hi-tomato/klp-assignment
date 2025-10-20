import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

type UserProfile = {
  displayName?: string;
  photoURL?: string;
  introduce?: string;
  updatedAt?: string;
};
export const useGetUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);

    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("프로필 로드 실패: ", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { profile, isLoading };
};

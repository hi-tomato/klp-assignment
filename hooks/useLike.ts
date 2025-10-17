import { db } from "@/lib/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useLike = (postId: string) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(
    function checkLikedEffect() {
      try {
        const checkLiked = async () => {
          const likeRef = doc(db, `posts/${postId}/likes/${user?.uid}`);
          const likeSnap = await getDoc(likeRef);
          setIsLiked(likeSnap.exists());
        };

        checkLiked();
      } catch (error) {
        setError("에러가 발생하였습니다.");
      }
    },
    [postId, user]
  );

  const toggleLiked = async (postId: string) => {
    if (!user) {
      setError("로그인 후, 이용해주세요.");
      setLoading(false);
      throw new Error("로그인 후, 이용해주세요.");
    }

    try {
      setLoading(true);
      setError(null);

      const postRef = doc(db, `posts/${postId}`);
      const likeRef = doc(db, `posts/${postId}/likes/${user?.uid}`);
      const likeDoc = await getDoc(likeRef);

      if (likeDoc.exists()) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, {
          likeCount: increment(-1),
        });
        setIsLiked(false);
        return false;
      } else {
        await setDoc(likeRef, {
          userId: user?.uid,
          createdAt: serverTimestamp(),
        });

        await updateDoc(postRef, {
          likeCount: increment(1),
        });

        setIsLiked(true);
        return true;
      }
    } catch (error: any) {
      setError("에러가 발생하였습니다.");
      setLoading(false);
    }
  };

  return { toggleLiked, loading, error, isLiked };
};

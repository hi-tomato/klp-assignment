import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { sendPushNotification } from "./useNotifications";

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (postId: string, content: string) => {
    const user = auth.currentUser;
    setLoading(true);

    if (!user) {
      setError("로그인 후 이용해주세요.");
      setLoading(false);
      throw new Error("로그인 후 이용해주세요.");
    }

    try {
      const commentRef = await addDoc(
        collection(db, `posts/${postId}/comments`),
        {
          postId,
          authorId: user.uid,
          content,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          isDeleted: false,
        }
      );

      await updateDoc(doc(db, `posts`, postId), {
        commentCount: increment(1),
      });

      const postSnap = await getDoc(doc(db, `posts`, postId));
      const postData = postSnap.data();

      if (postData && postData.authorId !== user.uid) {
        await sendPushNotification(
          postData.authorId,
          "새로운 댓글",
          `${user.displayName || "누군가"}님이 댓글을 남겼습니다: ${content.substring(0, 30)}...`
        );
      }

      setLoading(false);
      return commentRef.id;
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  return { addComment, loading, error };
};

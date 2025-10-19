import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  increment,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

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

import { auth, db } from "@/lib/firebase";
import { PostComment } from "@/types";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

export const useDeleteComment = (postId: string) => {
  const [error, setError] = useState<string | null>(null);

  const deleteComment = async (commentId: string) => {
    const user = auth.currentUser;

    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }

    setError(null);

    try {
      const postRef = doc(db, "posts", postId);
      const commentRef = doc(db, "posts", postId, "comments", commentId);
      const commentSnap = await getDoc(commentRef);

      if (!commentSnap.exists()) {
        setError("댓글을 찾을 수 없습니다.");
        return;
      }

      const commentData = commentSnap.data() as PostComment;
      if (commentData.authorId !== user?.uid) {
        setError("삭제 권한이 없습니다.");
        return;
      }

      await deleteDoc(commentRef);

      await updateDoc(postRef, {
        commentCount: increment(-1),
      });

      return true;
    } catch (error: any) {
      setError(error.message || "댓글 삭제에 실패했습니다.");
    }
  };

  return { deleteComment, error };
};

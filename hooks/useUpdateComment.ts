import { auth, db } from "@/lib/firebase";
import { PostComment } from "@/types";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useUpdateComment = (postId: string) => {
  const [error, setError] = useState<string | null>(null);

  const updateComment = async (commentId: string, newContent: string) => {
    const user = auth.currentUser;

    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }
    if (!newContent.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }

    setError(null);

    try {
      const commentRef = doc(db, "posts", postId, "comments", commentId);
      const commentSnap = await getDoc(commentRef);
      const commentData = commentSnap.data() as PostComment;

      if (!commentSnap.exists() || commentData.authorId !== user?.uid) {
        setError("댓글 수정 권한이 없습니다.");
        return;
      }

      await updateDoc(commentRef, {
        content: newContent,
        updatedAt: serverTimestamp(),
      });

      return true;
    } catch (error: any) {
      setError(error.message || "댓글 수정에 실패했습니다.");
    }
  };

  return { updateComment, error };
};

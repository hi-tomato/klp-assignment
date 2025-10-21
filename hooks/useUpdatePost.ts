import { auth, db } from "@/lib/firebase";
import { Post } from "@/types";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";

interface UpdatePostData {
  title?: string;
  content?: string;
  imageUrl?: string[];
}

export const useUpdatePost = () => {
  const [error, setError] = useState<string | null>(null);

  const updatePost = async (postId: string, newPostData: UpdatePostData) => {
    const user = auth.currentUser;

    if (!user) {
      setError("로그인 후 이용해주세요.");
      throw new Error("로그인 후 이용해주세요.");
    }

    setError(null);

    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      const postData = postSnap.data() as Post;

      if (postData.authorId !== user.uid) {
        setError("게시글 수정 권한이 없습니다.");
        throw new Error("게시글 수정 권한이 없습니다.");
      }
      await updateDoc(postRef, {
        ...newPostData,
        updatedAt: serverTimestamp(),
      });

      const updatedDoc = await getDoc(postRef);
      return { ...(updatedDoc.data() as Post), id: updatedDoc.id };
    } catch (error: any) {
      setError(error.message || "게시글 수정에 실패했습니다.");
      throw error;
    }
  };
  return { updatePost, error };
};

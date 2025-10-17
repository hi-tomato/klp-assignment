import { auth, db } from "@/lib/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { useState } from "react";

interface CreatePost {
  title: string;
  content: string;
  imageUrl: string[];
}

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async ({ title, content, imageUrl = [] }: CreatePost) => {
    const user = auth.currentUser;

    if (!user) {
      const errorMsg = "로그인이 필요합니다.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);

    try {
      const postData = {
        authorId: user.uid,
        title,
        content,
        imageUrl,
        createdAt: Timestamp.now(),
        likeCount: 0,
        commentCount: 0,
      };

      const docRef = await addDoc(collection(db, "posts"), postData);

      console.log("Post 생성 성공:", docRef.id);
      setLoading(false);

      return docRef;
    } catch (err: any) {
      console.error("Post 생성 실패:", err);
      setError(err.message || "게시글 생성에 실패했습니다.");
      setLoading(false);
      throw err;
    }
  };

  return { createPost, loading, error };
};

import { auth, db } from "@/lib/firebase";
import { Post } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

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

export const useDeletePost = () => {
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (postId: string) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        throw new Error("게시글을 찾을 수 없습니다.");
      }

      const postData = postSnap.data() as Post;

      if (postData.authorId !== user?.uid) {
        throw new Error("삭제 권한이 없습니다.");
      }

      const likesSnap = await getDocs(collection(db, `posts/${postId}/likes`));
      const likeDeletePromise = likesSnap.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(likeDeletePromise);

      const commentsSnap = await getDocs(
        collection(db, `posts/${postId}/comments`)
      );
      const commentDeletePromise = commentsSnap.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(commentDeletePromise);

      await deleteDoc(postRef);
      return true;
    } catch (error) {
      setError(error as string);
    }
  };
  return { deletePost, error };
};

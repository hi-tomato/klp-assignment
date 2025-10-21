import { db } from "@/lib/firebase";
import { PostComment } from "@/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetComments = (postId: string) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);

    const q = query(
      collection(db, `posts/${postId}/comments`),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PostComment[];

      setComments(comments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  return { comments, loading };
};

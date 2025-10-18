import { db } from "@/lib/firebase";
import { Post } from "@/types";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetPost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!postId) return;

    const unsub = onSnapshot(doc(db, "posts", postId), (doc) => {
      if (doc.exists()) {
        setPost({ id: doc.id, ...doc.data() } as Post);
      }
    });

    return () => unsub();
  }, [postId]);

  return { post };
};

export const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (post: any) =>
            post.id &&
            post.id.trim() !== "" &&
            post.authorId &&
            post.authorId.trim() !== ""
        ) as Post[];

      setPosts(postsData);
    });

    return () => unsub();
  }, []);

  return { posts };
};

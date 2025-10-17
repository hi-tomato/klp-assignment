import { Timestamp } from "firebase/firestore";

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp;
}

interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string[];
  createdAt: Timestamp;
  likeCount: number;
  commentCount: number;
}

interface PostLike {
  userId: string;
  createdAt: Timestamp;
}

interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isDeleted: boolean;
  authorImageUrl?: string;
}

interface Like {
  userId: string;
  createdAt: Timestamp;
}

export type { Like, Post, PostComment, PostLike };

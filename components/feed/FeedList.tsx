import { useGetPosts } from "@/hooks/useGetPost";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList } from "react-native";
import FeedItem from "./FeedItem";

export default function FeedList() {
  const flatListRef = useRef<FlatList | null>(null);
  const { posts } = useGetPosts();

  console.log("FeedList Posts: ", posts);

  useScrollToTop(flatListRef);

  return (
    <FlatList
      ref={flatListRef}
      data={posts || []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem post={item} />}
    />
  );
}

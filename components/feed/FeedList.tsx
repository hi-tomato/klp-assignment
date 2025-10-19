import { useGetPosts } from "@/hooks/useGetPost";
import { Post } from "@/types";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, Text, View } from "react-native";
import FeedItem from "./FeedItem";

interface FeedListProps {
  searchQuery: string;
  searchResults: Post[];
  isSearching: boolean;
}

export default function FeedList({
  searchQuery,
  searchResults,
  isSearching,
}: FeedListProps) {
  const flatListRef = useRef<FlatList | null>(null);
  const { posts } = useGetPosts();

  const displayPosts = isSearching ? searchResults : posts;

  useScrollToTop(flatListRef);
  if (isSearching && (!searchResults || searchResults.length === 0)) {
    return (
      <View>
        <Text>{searchQuery}에 대한 검색 결과가 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={displayPosts || []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem post={item} />}
    />
  );
}

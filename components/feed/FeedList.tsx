import { colors } from "@/constants/colors";
import { useGetPosts } from "@/hooks/useGetPost";
import { Post } from "@/types";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchQuery}에 대한 검색 결과가 없습니다.
        </Text>
        <Text style={styles.emptySubText}>다른 키워드로 검색해보세요.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={displayPosts || []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FeedItem post={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.BACKGROUND_SECONDARY,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
    backgroundColor: colors.BACKGROUND,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.TEXT_PRIMARY,
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.TEXT_SECONDARY,
    textAlign: "center",
  },
});

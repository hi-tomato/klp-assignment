import FeedList from "@/components/feed/FeedList";
import FeedSearchBar from "@/components/feed/FeedSearchBar";
import { colors } from "@/constants/colors";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { posts: searchResults, loading } = useSearchPosts(
    searchQuery as string
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user?.photoURL as string }}
          style={styles.profileImage}
        />
        <FeedSearchBar onSearch={setSearchQuery} loading={loading} />
      </View>

      <FeedList
        searchQuery={searchQuery}
        searchResults={searchResults}
        isSearching={!!searchQuery.trim()}
      />

      {user?.email && (
        <Pressable
          style={styles.editButton}
          onPress={() => router.push("/post/write")}
        >
          <Ionicons name="pencil" size={32} color={"white"} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: colors.GRAY_200,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
  },
  editButton: {
    width: 64,
    height: 64,
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "tomato",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

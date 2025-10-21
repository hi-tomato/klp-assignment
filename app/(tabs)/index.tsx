import FeedList from "@/components/feed/FeedList";
import FeedSearchBar from "@/components/feed/FeedSearchBar";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { useAuthStore } from "@/store/useAuthStore";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [searchQuery, setSearchQuery] = useState("");
  const { posts: searchResults, loading } = useSearchPosts(
    searchQuery as string
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("@/assets/images/default_profile.png")
          }
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

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.CARD_BACKGROUND,
      borderBottomWidth: 1,
      borderBottomColor: colors.BORDER_LIGHT,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.GRAY_200,
      borderWidth: 2,
      borderColor: colors.BORDER_LIGHT,
    },
    description: {
      fontSize: 16,
      color: colors.TEXT_PRIMARY,
    },
    editButton: {
      width: 60,
      height: 60,
      position: "absolute",
      right: 20,
      bottom: 24,
      backgroundColor: colors.PRIMARY,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.BLACK,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });

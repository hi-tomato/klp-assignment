import AuthRoutes from "@/components/AuthRoutes";
import FeedItem from "@/components/feed/FeedItem";
import { useGetPosts } from "@/hooks/useGetPost";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useAuthStore } from "@/store/useAuthStore";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const { user } = useAuthStore();
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const { posts } = useGetPosts();
  const { profile } = useGetUserProfile(user?.uid);
  const myPosts = posts?.filter((p) => p.authorId === user?.uid);

  return (
    <AuthRoutes>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header} />
          <Image
            style={styles.avatar}
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require("@/assets/images/default_profile.png")
            }
          />

          <View style={styles.container}>
            <View style={styles.profile}>
              <Text style={styles.nickname}>
                {user?.displayName || "익명 사용자"}
              </Text>
              <Text style={styles.introduce}>
                {profile?.introduce || "아직 소개글을 입력하지 않으셨습니다."}
              </Text>
              <Text style={styles.email}>{user?.email}</Text>

              <Pressable
                style={styles.editButton}
                onPress={() => router.push("/mypage/setting")}
              >
                <Ionicons
                  name="settings-outline"
                  size={16}
                  color={colors.PRIMARY}
                />
                <Text style={styles.editButtonText}>프로필 편집</Text>
              </Pressable>
            </View>

            <View style={styles.postsSection}>
              <Text style={styles.postsSectionTitle}>
                내 게시물 ({myPosts?.length || 0})
              </Text>
              {myPosts && myPosts.length > 0 ? (
                <View style={styles.postsContainer}>
                  {myPosts.map((post) => (
                    <FeedItem key={post.id} post={post} />
                  ))}
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    아직 작성한 게시물이 없습니다.
                  </Text>
                  <Text style={styles.emptySubText}>
                    첫 게시물을 작성해보세요!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthRoutes>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    header: {
      position: "relative",
      backgroundColor: colors.BACKGROUND_SECONDARY,
      width: "100%",
      height: 154,
    },
    avatar: {
      position: "absolute",
      top: 77,
      left: 16,
      width: 154,
      height: 154,
      borderRadius: 77,
      borderWidth: 4,
      borderColor: colors.CARD_BACKGROUND,
      backgroundColor: colors.GRAY_200,
    },
    container: {
      marginTop: 77,
      paddingBottom: 24,
    },
    profile: {
      padding: 16,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.BORDER_LIGHT,
    },
    nickname: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.TEXT_PRIMARY,
    },
    introduce: {
      fontSize: 14,
      color: colors.TEXT_SECONDARY,
      lineHeight: 20,
    },
    email: {
      fontSize: 12,
      color: colors.TEXT_TERTIARY,
      marginTop: 4,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 4,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.PRIMARY,
    },
    postsSection: {
      marginTop: 16,
    },
    postsSectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.TEXT_PRIMARY,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
    postsContainer: {
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
    emptyContainer: {
      paddingVertical: 60,
      paddingHorizontal: 32,
      alignItems: "center",
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

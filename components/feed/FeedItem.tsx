import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { Post } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ImagePreview from "./ImagePreview";
import Profile from "./Profile";

interface FeedItemProps {
  post: Post | null;
  isDetail?: boolean;
}

export default function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { user } = useAuthStore();

  console.log("feedItem postID: ", post?.id);

  const Container = isDetail ? View : Pressable;

  const handleMoreOption = () => {
    // TODO: 삭제, 취소 버튼
  };

  if (!post) return null;

  return (
    <Container
      style={styles.contentContainer}
      onPress={() => router.push(`/post/${post.id}`)}
    >
      <Profile
        displayName={post.authorId}
        createdAt={post.createdAt.toDate().toLocaleString() || "방금 전"}
        imageUri={post.imageUrl[0]}
        onPress={() => router.push(`/post/${post.id}`)}
        option={
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={colors.BLACK}
            onPress={handleMoreOption}
          />
        }
      />
      <Text numberOfLines={3} style={styles.description}>
        {post.content || "내용이 불러오지 못했습니다."}
      </Text>

      <ImagePreview imageUris={post.imageUrl} />

      <View style={styles.actionContainer}>
        <Pressable style={styles.menu}>
          <Ionicons name="heart" size={24} color={colors.BLACK} />
          <Text style={styles.menuText}>0</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="chatbox" size={24} color={colors.BLACK} />
          <Text style={styles.menuText}>0</Text>
        </Pressable>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  menu: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

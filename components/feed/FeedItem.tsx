import { colors } from "@/constants/colors";
import { useLike } from "@/hooks/useLike";
import { useDeletePost } from "@/hooks/usePost";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import ImagePreview from "./ImagePreview";
import Profile from "./Profile";

interface FeedItemProps {
  post: Post | null;
  isDetail?: boolean;
}

export default function FeedItem({ post, isDetail = false }: FeedItemProps) {
  const { showActionSheetWithOptions } = useActionSheet();
  const { toggleLiked, isLiked } = useLike(post?.id ?? "");
  const { deletePost } = useDeletePost();
  const Container = isDetail ? View : Pressable;

  const handleMoreOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const updateButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            try {
              const result = await deletePost(post?.id ?? "");
              Toast.show({
                type: result ? "success" : "error",
                text1: result
                  ? "게시글이 삭제되었습니다."
                  : "게시글 삭제에 실패했습니다.",
              });
              result && router.reload();
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "게시글 삭제에 실패했습니다.",
              });
            }
            break;

          case updateButtonIndex:
            router.push(`/post/write?id=${post?.id}`);
            break;

          case cancelButtonIndex:
            break;
        }
      }
    );
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
      {post.title && <Text>{post.title}</Text>}
      <Text numberOfLines={3} style={styles.description}>
        {post.content}
      </Text>

      <ImagePreview imageUris={post.imageUrl} />

      <View style={styles.actionContainer}>
        <Pressable style={styles.menu}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : colors.BLACK}
            onPress={() => toggleLiked()}
          />
          <Text style={styles.menuText}>{post.likeCount}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons
            name={post.commentCount > 0 ? "chatbox" : "chatbox-outline"}
            size={24}
            color={post.commentCount > 0 ? colors.BLACK : colors.GRAY_500}
            onPress={() => router.push(`/post/${post.id}`)}
          />
          <Text style={styles.menuText}>{post.commentCount}</Text>
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

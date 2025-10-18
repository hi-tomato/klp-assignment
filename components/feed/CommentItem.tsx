import { colors } from "@/constants/colors";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { useAuthStore } from "@/store/useAuthStore";
import { PostComment } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import InputField from "../common/InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: PostComment;
  isReply?: boolean;
}

export default function CommentItem({
  comment,
  isReply = true,
}: CommentItemProps) {
  const { user } = useAuthStore();

  const { deleteComment } = useDeleteComment(comment.postId);

  const handlePressOption = () => {
    Alert.alert("댓글 삭제", "댓글을 삭제하시겠습니까?", [
      {
        text: "취소",
      },
      {
        text: "삭제",
        onPress: async () => {
          const result = await deleteComment(comment.id);
          result && router.reload();
        },
      },
    ]);
  };

  const handleReplySubmit = () => {
    // TODO: 대댓글 기능
  };

  const handleShowReplyInput = () => {
    // TODO:
  };

  if (!comment)
    return (
      <View>
        <Text>댓글이 존재하지 않습니다.</Text>
      </View>
    );

  return (
    <View style={[styles.container]}>
      <Profile
        displayName={comment.authorId}
        createdAt={comment.createdAt.toDate().toLocaleString()}
        imageUri={comment.authorImageUrl || ""}
        onPress={() => {}}
        option={
          user?.uid === comment.authorId && (
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color="black"
              onPress={handlePressOption}
            />
          )
        }
      />
      <InputField
        editable={false}
        value={!comment.content ? "삭제된 댓글입니다." : comment.content}
      />
      {isReply && (
        <Pressable style={styles.replyContainer} onPress={() => {}}>
          <Text style={styles.replyText}>답글 남기기</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  replyContainer: {
    marginTop: 12,
  },
  replyText: {
    fontSize: 14,
    color: "tomato",
    fontWeight: "bold",
  },
});

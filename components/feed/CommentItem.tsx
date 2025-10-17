import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { PostComment } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

  const handlePressOption = () => {
    //TODO: 댓글 삭제, 수정 기능 구현
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
  replyContainer: {},
  replyText: {
    fontSize: 14,
    color: "tomato",
    fontWeight: "bold",
  },
  submitButton: {},
  submitButtonText: {},
});

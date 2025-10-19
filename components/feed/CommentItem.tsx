import { colors } from "@/constants/colors";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { useUpdateComment } from "@/hooks/useUpdateComment";
import { useAuthStore } from "@/store/useAuthStore";
import { PostComment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const { user } = useAuthStore();
  const { deleteComment } = useDeleteComment(comment.postId);
  const { updateComment } = useUpdateComment(comment.postId);
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const editButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions({ options }, async (selectedIndex) => {
      switch (selectedIndex) {
        case destructiveButtonIndex:
          const deleteResult = await deleteComment(comment.id);
          Toast.show({
            type: deleteResult ? "success" : "error",
            text1: deleteResult
              ? "댓글이 삭제되었습니다."
              : "댓글 삭제에 실패했습니다.",
          });
          deleteResult && router.reload();
          break;
        case editButtonIndex:
          setIsEditing(true);
          break;
        case cancelButtonIndex:
          break;
      }
    });
  };

  const handleUpdateComment = async () => {
    await updateComment(comment.id, editedContent);
    Toast.show({
      type: "success",
      text1: "댓글이 수정되었습니다.",
    });
    setIsEditing(false);
    router.reload();
  };

  if (!comment)
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>댓글이 존재하지 않습니다.</Text>
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
              color={colors.GRAY_700}
              onPress={handlePressOption}
            />
          )
        }
      />
      <InputField
        editable={false}
        value={!comment.content ? "삭제된 댓글입니다." : comment.content}
      />

      {isEditing && (
        <View>
          <InputField value={editedContent} onChangeText={setEditedContent} />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable onPress={handleUpdateComment}>
              <Text style={styles.saveText}>저장</Text>
            </Pressable>
            <Pressable onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>취소</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER_LIGHT,
  },
  replyContainer: {
    marginTop: 12,
  },
  replyText: {
    fontSize: 14,
    color: colors.PRIMARY,
    fontWeight: "700",
  },
  saveText: {
    fontSize: 14,
    color: colors.PRIMARY,
    fontWeight: "700",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    fontSize: 14,
    color: colors.TEXT_SECONDARY,
    fontWeight: "700",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  notFoundContainer: {
    padding: 16,
    backgroundColor: colors.GRAY_50,
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 14,
    color: colors.TEXT_SECONDARY,
    fontStyle: "italic",
  },
});

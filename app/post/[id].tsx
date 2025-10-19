import AuthRoutes from "@/components/AuthRoutes";
import InputField from "@/components/common/InputField";
import CommentItem from "@/components/feed/CommentItem";
import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants/colors";
import { useAddComment } from "@/hooks/useAddComment";
import { useGetComments } from "@/hooks/useGetComments";
import { useGetPost } from "@/hooks/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PostScreen() {
  const [comment, setComment] = useState("");
  const { id } = useLocalSearchParams();
  const { post } = useGetPost(id as string);

  const { comments, loading: commentsLoading } = useGetComments(id as string);
  const { addComment } = useAddComment();

  const handleCommentSubmit = () => {
    addComment(id as string, comment)
      .then((commentId) => {
        console.log("댓글 등록 성공: ", commentId);
        setComment("");
      })
      .catch((error) => {
        console.error("댓글 등록 실패: ", error);
        Alert.alert("댓글 등록 실패", error.message);
      });
  };

  return (
    <AuthRoutes>
      <View style={styles.container}>
        <ScrollView
          style={{ marginBottom: 75 }}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <FeedItem post={post || null} isDetail={true} />

          {commentsLoading ? (
            <View>
              <Text>댓글을 불러오는 중...</Text>
            </View>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
          {/* 댓글이 없을 떄 */}
          {comments.length === 0 && !commentsLoading && (
            <View>
              <Text>첫 번째 댓글을 달아보세요!</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.commentContainer}>
          <InputField
            value={comment}
            onChangeText={(t) => setComment(t)}
            placeholder="댓글을 입력해주세요."
            rightElement={
              <Pressable
                disabled={!comment}
                onPress={handleCommentSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>등록</Text>
              </Pressable>
            }
          />
        </View>
      </View>
    </AuthRoutes>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollViewContainer: {
    flex: 1,
  },
  commentContainer: {
    width: "100%",
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: "absolute",
  },
  submitButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "orange",
  },
  submitButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});

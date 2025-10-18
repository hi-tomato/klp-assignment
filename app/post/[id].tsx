import AuthRoutes from "@/components/AuthRoutes";
import InputField from "@/components/common/InputField";
import CommentItem from "@/components/feed/CommentItem";
import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function PostScreen() {
  const [comment, setComment] = useState("");
  // const { id } = useLocalSearchParams();
  const { user } = useAuthStore();

  const handleCommentSubmit = () => {
    // TODO: 댓글 등록 API 기능 구현
  };

  return (
    <AuthRoutes>
      <View style={styles.container}>
        <ScrollView
          style={{ marginBottom: 75 }}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <FeedItem user={user} isDetail={true} />

          <CommentItem />
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

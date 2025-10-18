import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ImagePreview from "./ImagePreview";
import Profile from "./Profile";

interface FeedItemProps {
  user: any;
  isDetail?: boolean;
}
const post = { id: "1" };

export default function FeedItem({ user, isDetail = false }: FeedItemProps) {
  const Container = isDetail ? View : Pressable;

  const handleMoreOption = () => {
    // TODO: 삭제, 취소 버튼
  };

  return (
    <Container
      style={styles.contentContainer}
      onPress={() => router.push(`/post/${post.id}`)}
    >
      <Profile
        user={user}
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
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit.
      </Text>

      <ImagePreview imageUris={["https://picsum.photos/200/300"]} />

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

import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileProps {
  displayName: string;
  imageUri?: string;
  createdAt: string;
  option?: ReactNode;
  onPress: () => void;
}

export default function Profile({
  displayName,
  imageUri,
  createdAt,
  option,
  onPress,
}: ProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={() => {}}>
        <Image
          style={styles.avatar}
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/favicon.png")
          }
        />
        <View style={{ gap: 4 }}>
          <Text style={styles.nickname}>
            {displayName ? displayName : "익명 사용자"}
          </Text>
          <Text style={styles.createdAt}>{createdAt}</Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_100,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.BLACK,
  },
  createdAt: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

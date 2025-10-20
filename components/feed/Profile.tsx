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
              : require("@/assets/images/default_profile.png")
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.BORDER_LIGHT,
    backgroundColor: colors.GRAY_100,
  },
  nickname: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.TEXT_PRIMARY,
    marginBottom: 2,
  },
  createdAt: {
    fontSize: 13,
    color: colors.TEXT_SECONDARY,
  },
});

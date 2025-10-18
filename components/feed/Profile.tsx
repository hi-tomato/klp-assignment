import { colors } from "@/constants/colors";
import { User } from "firebase/auth";
import { ReactNode } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileProps {
  user: User;
  option?: ReactNode;
}

export default function Profile({ user, option }: ProfileProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer}>
        <Image
          style={styles.avatar}
          source={require("@/assets/images/favicon.png")}
        />
        <View style={{ gap: 4 }}>
          <Text style={styles.nickname}>
            {user ? user.email : "익명사용자"}
          </Text>
          <Text style={styles.createdAt}>2시간 전...</Text>
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

import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { timeAgo } from "@/util/timeago";
import { ReactNode, useMemo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileProps {
  displayName: string;
  imageUri?: string;
  createdAt: string | Date;
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
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

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
          <Text style={styles.createdAt}>
            {timeAgo(
              typeof createdAt === "string"
                ? createdAt
                : createdAt.toISOString()
            )}
          </Text>
        </View>
      </Pressable>
      {option}
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
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

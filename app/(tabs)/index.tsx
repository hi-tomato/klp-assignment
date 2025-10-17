import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { User } from "firebase/auth";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <FeedItem user={user as User} />
      {user?.email && (
        <Pressable style={styles.editButton}>
          <Ionicons name="pencil" size={32} color={"white"} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
  },
  editButton: {
    width: 64,
    height: 64,
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "tomato",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

import FeedItem from "@/components/feed/FeedItem";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyData = [
  {
    id: "1",
    user: {
      id: "1",
      name: "이승준",
      email: "test@naver.com",
    },
    content: "목데이터입니다.",
    images: ["https://picsum.photos/200/300"],
    createdAt: new Date(),
  },
  {
    id: "1",
    user: {
      id: "1",
      name: "이승준",
      email: "test@naver.com",
    },
    content: "목데이터입니다.",
    images: ["https://picsum.photos/200/300"],
    createdAt: new Date(),
  },
  {
    id: "1",
    user: {
      id: "1",
      name: "이승준",
      email: "test@naver.com",
    },
    content: "목데이터입니다.",
    images: ["https://picsum.photos/200/300"],
    createdAt: new Date(),
  },
  {
    id: "1",
    user: {
      id: "1",
      name: "이승준",
      email: "test@naver.com",
    },
    content: "목데이터입니다.",
    images: ["https://picsum.photos/200/300"],
    createdAt: new Date(),
  },
];

export default function HomeScreen() {
  const { user } = useAuthStore();
  const flatListRef = useRef<FlatList | null>(null);
  useScrollToTop(flatListRef);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FeedItem user={item.user} />}
      />
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

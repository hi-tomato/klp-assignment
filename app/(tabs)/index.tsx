import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Link href="/auth">로그인 창으로 이동하기</Link>
      </View>
    </SafeAreaView>
  );
}

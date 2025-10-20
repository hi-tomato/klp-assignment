import AuthRoutes from "@/components/AuthRoutes";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageSettingScreen() {
  return (
    <AuthRoutes>
      <SafeAreaView>
        <Text>My Page Setting Screen</Text>
      </SafeAreaView>
    </AuthRoutes>
  );
}

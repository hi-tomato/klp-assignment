import CustomButton from "@/components/common/CustomButton";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <CustomButton label="테스트 버튼" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

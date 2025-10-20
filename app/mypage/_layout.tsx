import { colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen name="setting" options={{ headerShown: false }} />
    </Stack>
  );
}

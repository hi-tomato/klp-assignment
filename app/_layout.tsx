import { useAuthStore } from "@/store/useAuthStore";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <KeyboardProvider>
        <RootLayoutNavigator />
      </KeyboardProvider>
      <Toast />
    </ActionSheetProvider>
  );
}

function RootLayoutNavigator() {
  const { user } = useAuthStore();

  useEffect(() => {
    user?.uid &&
      Toast.show({
        type: "success",
        text1: `${user?.displayName ?? "사용자"}님 환영합니다!`,
      });
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="image-viewer" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}

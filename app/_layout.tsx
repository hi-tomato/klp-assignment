import { useNotifications } from "@/hooks/useNotifications";
import { useAuthStore } from "@/store/useAuthStore";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
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
        <Toast />
      </KeyboardProvider>
    </ActionSheetProvider>
  );
}

function RootLayoutNavigator() {
  const { user } = useAuthStore();
  const { expoPushToken } = useNotifications();
  const { isDarkMode } = useDarkModeStore();

  useEffect(() => {
    user?.uid &&
      Toast.show({
        type: "success",
        text1: `${user?.displayName ?? "사용자"}님 환영합니다!`,
      });
  }, [user]);

  useEffect(() => {
    if (expoPushToken) {
      console.log("Expo Notification Token:", expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    useDarkModeStore.getState().loadDarkMode();
  }, []);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
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
    </>
  );
}

import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function AuthLayout() {
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.CARD_BACKGROUND,
        },
        headerTintColor: colors.TEXT_PRIMARY,
        contentStyle: {
          backgroundColor: colors.BACKGROUND,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "로그인",
          headerLeft: () => (
            <Pressable onPress={() => router.push("/")}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={colors.TEXT_PRIMARY}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "회원가입",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={colors.TEXT_PRIMARY}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "이메일 로그인",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={colors.TEXT_PRIMARY}
              />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

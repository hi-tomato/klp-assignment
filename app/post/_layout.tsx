import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "상세보기",
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="write"
        options={{
          headerShown: true,
          headerTitle: "게시글 작성",
          headerLeft: () => (
            <Pressable
              onPress={() =>
                router.canGoBack() ? router.back() : router.replace("/")
              }
            >
              <Feather name="arrow-left" size={28} color={"black"} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

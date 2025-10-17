import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: { backgroundColor: colors.WHITE },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Stack>
  );
}

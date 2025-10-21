import { colors } from "@/constants/colors";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isDarkMode } = useDarkModeStore();
  const tabBarActiveTintColor = isDarkMode ? colors.WHITE : colors.BLACK;
  const tabBarInactiveTintColor = isDarkMode
    ? colors.GRAY_400
    : colors.GRAY_500;
  const tabBarBackgroundColor = isDarkMode ? colors.GRAY_900 : colors.WHITE;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          borderTopColor: isDarkMode ? colors.GRAY_800 : colors.BORDER_LIGHT,
        },
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={24}
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "My Page",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

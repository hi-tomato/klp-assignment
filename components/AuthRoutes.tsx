import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AuthRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, initializing } = useAuthStore();

  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/auth");
    }
  }, [initializing, user]);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

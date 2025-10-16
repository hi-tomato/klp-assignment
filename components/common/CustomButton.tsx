import { colors } from "@/constants/colors";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

export default function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles[variant]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  medium: {
    //
  },
  large: {
    width: "100%",
    height: 44,
  },
  filled: {
    backgroundColor: "tomato",
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  pressed: {
    opacity: 0.7,
  },
});

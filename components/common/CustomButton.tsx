import { colors } from "@/constants/colors";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled" | "standard";
  disabled?: boolean;
}

export default function CustomButton({
  label,
  size = "large",
  variant = "filled",
  disabled = false,
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
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles[`${variant}Text`]}>{label}</Text>
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
    alignSelf: "center",
    paddingHorizontal: 12,
    height: 38,
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
  filledText: {
    color: colors.WHITE,
  },
  standard: {},
  standardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "tomato",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
    color: colors.WHITE,
  },
});

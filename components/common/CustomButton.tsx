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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  medium: {
    alignSelf: "center",
    paddingHorizontal: 16,
    height: 40,
  },
  large: {
    width: "100%",
    height: 48,
  },
  filled: {
    backgroundColor: colors.PRIMARY,
    fontSize: 15,
    fontWeight: "700",
  },
  filledText: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: "700",
  },
  standard: {
    backgroundColor: "transparent",
  },
  standardText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.PRIMARY,
  },
  pressed: {
    opacity: 0.75,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
});

import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import React, { ForwardedRef, forwardRef, ReactNode, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  variant?: "filled" | "standard" | "outlined";
  errorMessage?: string;
  rightElement?: ReactNode;
}

const InputField = (
  {
    label,
    placeholder,
    variant = "filled",
    errorMessage = "",
    rightElement,
    style,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) => {
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <View>{label && <Text style={styles.label}>{label}</Text>}</View>
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(errorMessage) && styles.inputError,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={colors.TEXT_TERTIARY}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          ref={ref}
          {...props}
        />
        {rightElement && rightElement}
      </View>

      {Boolean(errorMessage) && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  );
};

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    container: {
      height: 48,
      borderRadius: 10,
      paddingHorizontal: 14,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 13,
      marginBottom: 6,
      fontWeight: "600",
      color: colors.TEXT_PRIMARY,
    },
    input: {
      fontSize: 15,
      padding: 0,
      flex: 1,
      color: colors.TEXT_PRIMARY,
    },
    filled: {
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
    standard: {
      borderWidth: 1,
      borderColor: colors.BORDER_DEFAULT,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    outlined: {
      borderWidth: 1.5,
      borderColor: colors.GRAY_600,
      backgroundColor: colors.CARD_BACKGROUND,
    },
    errorMessage: {
      fontSize: 12,
      marginTop: 4,
      color: colors.DANGER,
    },
    inputError: {
      borderColor: colors.DANGER,
      borderWidth: 1.5,
    },
  });

export default forwardRef(InputField);

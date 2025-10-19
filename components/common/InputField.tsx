import { colors } from "@/constants/colors";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
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
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) => {
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
          style={styles.input}
          placeholder={placeholder}
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

const styles = StyleSheet.create({
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
    backgroundColor: colors.GRAY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.BORDER_DEFAULT,
    backgroundColor: colors.WHITE,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: colors.GRAY_600,
    backgroundColor: colors.WHITE,
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

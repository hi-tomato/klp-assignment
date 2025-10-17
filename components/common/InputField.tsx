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
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: colors.GRAY_700,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.GRAY_700,
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 4,
    color: "red",
  },
  inputError: {
    backgroundColor: "red",
  },
});

export default forwardRef(InputField);

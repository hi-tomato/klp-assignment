import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import EmailInput from "@/components/input/EmailInput";
import PasswordConfirmInput from "@/components/input/PasswordConfirmInput";
import PasswordInput from "@/components/input/PasswordInput";
import { useSignUp } from "@/hooks/useSignUp";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpScreen() {
  const { signUp, error, isLoading } = useSignUp();
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const signUpFormValues = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { email, password } = data;
      await signUp(email, password);
      router.push("/auth/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
        <Text style={styles.loadingText}>회원가입 중...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>오류 발생</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );

  return (
    <FormProvider {...signUpFormValues}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>회원가입</Text>
          <Text style={styles.subtitle}>새로운 계정을 만들어보세요</Text>
        </View>
        <View style={styles.formSection}>
          <EmailInput />
          <PasswordInput />
          <PasswordConfirmInput />
        </View>
      </View>
      <FixedButtonCTA
        label="회원가입"
        onPress={signUpFormValues.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
      paddingHorizontal: 20,
      paddingTop: 32,
    },
    headerSection: {
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.TEXT_PRIMARY,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
    },
    formSection: {
      gap: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.BACKGROUND,
      gap: 16,
    },
    loadingText: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
      fontWeight: "600",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.BACKGROUND,
      paddingHorizontal: 32,
      gap: 12,
    },
    errorText: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.DANGER,
    },
    errorMessage: {
      fontSize: 15,
      color: colors.TEXT_SECONDARY,
      textAlign: "center",
    },
  });

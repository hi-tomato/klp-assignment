import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import { useAuthStore } from "@/store/useAuthStore";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { login } = useAuthStore();
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const loginFormValues = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    await login(email, password);
    router.push("/");
  };

  return (
    <FormProvider {...loginFormValues}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>로그인</Text>
          <Text style={styles.subtitle}>계정에 로그인하세요</Text>
        </View>
        <View style={styles.formSection}>
          <EmailInput />
          <PasswordInput />
        </View>
      </View>
      <FixedButtonCTA
        label="로그인하기"
        onPress={loginFormValues.handleSubmit(onSubmit)}
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
  });

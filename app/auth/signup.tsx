import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import EmailInput from "@/components/input/EmailInput";
import PasswordConfirmInput from "@/components/input/PasswordConfirmInput";
import PasswordInput from "@/components/input/PasswordInput";
import { useSignUp } from "@/hooks/useSignUp";
import { router } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpScreen() {
  const { signUp, error, isLoading } = useSignUp();
  const signUpFormValues = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    // TODO: 회원가입 API 연결
    try {
      const { email, password } = data;
      await signUp(email, password);
      router.push("/auth/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FormProvider {...signUpFormValues}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
        <PasswordConfirmInput />
      </View>
      <FixedButtonCTA
        label="회원가입"
        onPress={signUpFormValues.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    margin: 16,
  },
});

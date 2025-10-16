import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const loginFormValues = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // TODO: 실제 API 연동 필요함.
    console.log("로그인 데이터: " + data);
  };

  return (
    <FormProvider {...loginFormValues}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>
      <FixedButtonCTA
        label="로그인하기"
        onPress={loginFormValues.handleSubmit(onSubmit)}
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

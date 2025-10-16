import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import EmailInput from "@/components/input/EmailInput";
import PasswordConfirmInput from "@/components/input/PasswordConfirmInput";
import PasswordInput from "@/components/input/PasswordInput";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignUpScreen() {
  const signUpFormValues = useForm<SignUpFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    // TODO: 회원가입 API 연결
    console.log("회원가입 데이터: " + data);
  };

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

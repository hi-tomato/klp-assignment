import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import InputField from "@/components/common/InputField";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUpScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeText = (type: string, text: string) => {
    setForm((prev) => ({ ...prev, [type]: text }));
  };

  const handleSignUp = () => {
    // TODO: 회원가입 API 연결
    if (true) {
      router.push("/auth/login");
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        value={form.email}
        onChangeText={(t) => handleChangeText("email", t)}
      />
      <InputField
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        value={form.password}
        onChangeText={(t) => handleChangeText("password", t)}
      />
      <InputField
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해주세요."
        value={form.passwordConfirm}
        onChangeText={(t) => handleChangeText("passwordConfirm", t)}
      />

      <FixedButtonCTA label="회원가입" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    margin: 16,
  },
});

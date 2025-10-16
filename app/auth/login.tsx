import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import InputField from "@/components/common/InputField";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (type: string, text: string) => {
    setFormValue((prev) => ({ ...prev, [type]: text }));
  };

  return (
    <View style={styles.container}>
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={formValue.email}
        onChangeText={(t) => handleChangeText("email", t)}
      />
      <InputField
        label="이메일"
        placeholder="이메일을 입력해주세요"
        value={formValue.password}
        onChangeText={() => {}}
      />

      <FixedButtonCTA label="로그인하기" onPress={() => {}} />
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

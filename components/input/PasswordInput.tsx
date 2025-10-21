import { VALIDATION } from "@/constants/validation";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Keyboard } from "react-native";
import InputField from "../common/InputField";

export default function PasswordInput() {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="password"
      rules={{
        validate: (data: string) =>
          VALIDATION.PASSWORD_REQUIRED(data) || VALIDATION.PASSWORD_VALID(data),
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          label="비밀번호"
          value={value}
          placeholder="비밀번호를 입력해주세요"
          secureTextEntry
          textContentType="oneTimeCode"
          onChangeText={(text) => onChange(text, "password")}
          errorMessage={error?.message}
          ref={ref}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      )}
    />
  );
}

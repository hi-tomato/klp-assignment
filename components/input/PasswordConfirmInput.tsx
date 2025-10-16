import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "../common/InputField";

export default function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });

  return (
    <Controller
      control={control}
      name="passwordConfirm"
      rules={{
        validate: (data: string) => {
          if (data !== password) {
            return "비밀번호가 일치하지 않습니다.";
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="비밀번호 확인"
          secureTextEntry
          placeholder="비밀번호를 입력해주세요."
          value={value}
          textContentType="oneTimeCode"
          onChangeText={onChange}
          errorMessage={error?.message}
        />
      )}
    />
  );
}

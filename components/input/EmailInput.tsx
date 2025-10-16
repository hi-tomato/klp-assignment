import { VALIDATION } from "@/constants/validation";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";

export default function EmailInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      control={control}
      name="email"
      rules={{
        validate: (data: string) =>
          VALIDATION.EMAIL_REQUIRED(data) || VALIDATION.EMAIL_VALID(data),
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
          autoFocus
          value={value}
          onChangeText={(text) => onChange(text, "email")}
          onSubmitEditing={() => setFocus("password")}
          errorMessage={error?.message}
        />
      )}
    />
  );
}

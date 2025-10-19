import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";

export default function ContentInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="content"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) return "내용을 입력해주세요.";
        },
      }}
      render={({ field: { ref, value, onChange }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          value={value}
          onChangeText={onChange}
          label="내용"
          placeholder="내용을 입력해주세요."
          errorMessage={error?.message}
          multiline
          returnKeyType="next"
        />
      )}
    />
  );
}

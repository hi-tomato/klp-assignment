import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";

export default function TitleInput() {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="title"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) return "제목을 입력해주세요.";
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          label="제목"
          placeholder="제목을 입력해주세요."
          value={value}
          onChangeText={onChange}
          onBlur={() => setFocus("title")}
          errorMessage={error?.message}
          onSubmitEditing={() => setFocus("content")}
          submitBehavior="submit"
        />
      )}
    />
  );
}

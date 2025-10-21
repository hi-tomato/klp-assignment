import { Controller, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";

export default function DisplayNameInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="displayName"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          value={value}
          onChangeText={(t) => onChange(t)}
          placeholder="변경될 닉네임을 입력해주세요."
          errorMessage={error?.message}
          label="닉네임"
        />
      )}
      rules={{
        validate: (value) => {
          if (value.length === 0) {
            return "닉네임을 입력해주세요.";
          }
          return true;
        },
      }}
    />
  );
}

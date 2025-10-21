import { Controller, useFormContext } from "react-hook-form";
import InputField from "../common/InputField";

export default function IntroduceInput() {
  const { control } = useFormContext();
  return (
    <Controller
      name="introduce"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <InputField
          value={value}
          onChangeText={(t) => onChange(t)}
          placeholder="소개를 적어주세요."
          multiline={true}
          errorMessage={error?.message}
          label="한 줄 소개"
        />
      )}
      rules={{
        validate: (value) => {
          if (value.length === 0) {
            return "한 줄 소개를 입력해주세요.";
          }
          return true;
        },
      }}
    />
  );
}

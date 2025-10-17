import CustomButton from "@/components/common/CustomButton";
import ImagePreview from "@/components/feed/ImagePreview";
import ContentInput from "@/components/input/ContentInput";
import TitleInput from "@/components/input/TitleInput";
import { useCreatePost } from "@/hooks/usePost";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

type WriteFormValues = {
  title: string;
  content: string;
  imageUrl: string[];
};

export default function WriteScreen() {
  const navigation = useNavigation();
  const { createPost } = useCreatePost();
  const writeForm = useForm<WriteFormValues>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: [],
    },
  });

  const onSubmit = async (data: WriteFormValues) => {
    const { title, content, imageUrl } = data;

    try {
      await createPost({
        title,
        content,
        imageUrl,
      });
      // TODO: Toast로 변경
      Alert.alert("성공", "게시글이 작성되었습니다!", [{ text: "확인" }]);
    } catch (error) {
      Alert.alert("실패", "게시글 작성에 실패했습니다.");
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={writeForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, []);

  return (
    <FormProvider {...writeForm}>
      <View style={styles.formContainer}>
        <TitleInput />
        <ContentInput />
        <ImagePreview imageUris={[]} />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 12,
    gap: 12,
  },
});

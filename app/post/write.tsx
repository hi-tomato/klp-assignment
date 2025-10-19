import CustomButton from "@/components/common/CustomButton";
import FeedFooter from "@/components/feed/FeedFooter";
import ImagePreview from "@/components/feed/ImagePreview";
import ContentInput from "@/components/input/ContentInput";
import TitleInput from "@/components/input/TitleInput";
import { useGetPost } from "@/hooks/useGetPost";
import { useCreatePost } from "@/hooks/usePost";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

type WriteFormValues = {
  title: string;
  content: string;
  imageUrl: string[];
};

export default function WriteScreen() {
  const { id } = useLocalSearchParams();
  const isEditMode = !!id;
  const { post } = useGetPost(id as string);
  const { updatePost } = useUpdatePost();
  const { createPost } = useCreatePost();

  const navigation = useNavigation();
  const writeForm = useForm<WriteFormValues>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: [],
    },
  });
  const imageUris = writeForm.watch("imageUrl");

  const onSubmit = useCallback(
    async (data: WriteFormValues): Promise<void> => {
      const { title, content, imageUrl } = data;

      try {
        if (isEditMode && id) {
          await updatePost(id as string, {
            title,
            content,
            imageUrl,
          });
        } else {
          await createPost({
            title,
            content,
            imageUrl,
          });
        }

        Toast.show({
          type: "success",
          text1: isEditMode
            ? "게시글이 수정되었습니다."
            : "게시글이 작성되었습니다.",
        });

        router.replace("/(tabs)");
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: error.message || "게시글 작성에 실패했습니다.",
        });
      }
    },
    [isEditMode, id, createPost, updatePost]
  );

  useEffect(() => {
    if (isEditMode && post) {
      writeForm.reset({
        title: post?.title ?? "",
        content: post?.content ?? "",
        imageUrl: post?.imageUrl ?? [],
      });
    }
  }, [isEditMode, post, writeForm]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label={isEditMode ? "수정" : "저장"}
          size="medium"
          variant="standard"
          onPress={writeForm.handleSubmit(onSubmit)}
        />
      ),
    });
  }, [navigation, writeForm, writeForm.handleSubmit, onSubmit, isEditMode]);

  return (
    <FormProvider {...writeForm}>
      <View style={styles.formContainer}>
        <TitleInput />
        <ContentInput />
        <ImagePreview imageUris={imageUris} />
      </View>
      <FeedFooter />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 12,
    gap: 12,
  },
});

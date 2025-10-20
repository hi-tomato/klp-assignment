import FixedButtonCTA from "@/components/common/FixedButtonCTA";
import DisplayNameInput from "@/components/input/DisplayNameInput";
import IntroduceInput from "@/components/input/IntroduceInput";
import { colors } from "@/constants/colors";
import { useImageUploader } from "@/hooks/useImageUploader";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

type ProfileFormValues = {
  displayName: string;
  introduce: string;
};

export default function SettingScreen() {
  const { user } = useAuthStore();
  const { updateUserProfile, isLoading } = useUpdateProfile();
  const { pickImage, uploadMultipleImages } = useImageUploader();

  const formMethods = useForm<ProfileFormValues>({
    defaultValues: {
      displayName: user?.displayName ?? "",
      introduce: "",
    },
  });

  const handleSave = async (data: ProfileFormValues) => {
    try {
      await updateUserProfile({
        displayName: data.displayName,
        introduce: data.introduce,
      });

      Toast.show({
        type: "success",
        text1: "프로필 업데이트 성공",
      });

      router.push("/(tabs)/mypage");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "프로필 업데이트 실패",
        text2: err instanceof Error ? err.message : "다시 시도해주세요.",
      });
    }
  };

  const handleImageChange = async () => {
    // 이미지 변경
    try {
      const images = await pickImage();

      if (!images || images.length === 0) {
        return;
      }

      const uploadedUrls = await uploadMultipleImages([images[0].uri]);

      if (uploadedUrls.length === 0) return;

      await updateUserProfile({
        photoURL: uploadedUrls[0],
      });

      Toast.show({
        type: "success",
        text1: "프로필 사진이 변경되었습니다",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "이미지 업로드 실패",
        text2: err instanceof Error ? err.message : "다시 시도해주세요.",
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>프로필 편집</Text>
              <Text style={styles.subtitle}>프로필 정보를 수정하세요</Text>
            </View>

            <View style={styles.imageSection}>
              <Pressable
                style={styles.avatarContainer}
                onPress={handleImageChange}
              >
                <Image
                  style={styles.avatar}
                  source={
                    user?.photoURL
                      ? { uri: user.photoURL }
                      : require("@/assets/images/default_profile.png")
                  }
                />
                <View style={styles.avatarOverlay}>
                  <Ionicons name="camera" size={24} color={colors.WHITE} />
                </View>
              </Pressable>
              <Text style={styles.imageHint}>프로필 사진을 터치하여 변경</Text>
            </View>

            <View style={styles.formSection}>
              <DisplayNameInput />
              <IntroduceInput />
            </View>
          </View>
        </ScrollView>

        <FixedButtonCTA
          label={isLoading ? "저장중..." : "저장하기"}
          onPress={formMethods.handleSubmit(handleSave)}
        />
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.TEXT_SECONDARY,
  },
  imageSection: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER_LIGHT,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.BORDER_LIGHT,
    backgroundColor: colors.GRAY_100,
  },
  avatarOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.WHITE,
  },
  imageHint: {
    fontSize: 13,
    color: colors.TEXT_TERTIARY,
  },
  formSection: {
    gap: 20,
  },
});

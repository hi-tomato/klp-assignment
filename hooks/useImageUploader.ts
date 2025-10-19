import { auth, storage } from "@/lib/firebase";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export const useImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedUpload, setCompletedUpload] = useState(false);
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("이미지 접근 권한이 필요합니다.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestPermission();

      if (!hasPermission) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (result.canceled) {
        return null;
      }

      return result.assets;
    } catch (error: any) {
      setError(error.message || "이미지 선택 중 오류가 발생했습니다.");
      return null;
    }
  };

  const uploadImage = async (uri: string): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("로그인 후 이미지를 업로드할 수 있습니다.");
    }
    try {
      setUploading(true);
      setError(null);

      const response = await fetch(uri);
      const blob = await response.blob();

      if (blob.size > 5 * 1024 * 1024) {
        throw new Error("이미지 파일 크기는 5MB를 초과할 수 없습니다.");
      }

      const fileName = `${Date.now()}-${user.uid}-${uri.split("/").pop()}`;
      const storageRef = ref(storage, `posts/${fileName}`);

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);

      setUploading(false);
      setCompletedUpload(true);
      return downloadUrl;
    } catch (error: any) {
      setUploading(false);
      setError(error.message || "이미지 업로드 중 오류가 발생했습니다.");
      return null;
    }
  };

  const uploadMultipleImages = async (uris: string[]): Promise<string[]> => {
    const uploadedUris: string[] = [];

    for (const uri of uris) {
      const urls = await uploadImage(uri);
      urls && uploadedUris.push(urls);
    }

    return uploadedUris;
  };

  return {
    pickImage,
    uploadMultipleImages,
    uploading,
    error,
    completedUpload,
  };
};

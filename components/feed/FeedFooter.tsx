import { colors } from "@/constants/colors";
import { useImageUploader } from "@/hooks/useImageUploader";
import { Ionicons } from "@expo/vector-icons";
import { useFormContext, useWatch } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FeedFooter() {
  const inset = useSafeAreaInsets();
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: "imageUrl" });
  const { pickImage, uploadMultipleImages, uploading, completedUpload } =
    useImageUploader();

  const handleOpenImagePicker = async () => {
    const assets = await pickImage();
    if (!assets) return;

    const uris = assets.map((asset) => asset.uri);
    const uploadedUris = await uploadMultipleImages(uris);

    if (uploadedUris.length > 0) {
      setValue("imageUrl", [...(imageUris || []), ...uploadedUris]);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons
          name={"camera"}
          size={20}
          color={uploading ? colors.GRAY_500 : colors.BLACK}
        />
      </Pressable>

      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="small" color={colors.BLACK} />
          <Text style={styles.uploadingText}>업로드 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    alignItems: "center", // 추가
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
  footerIconDisabled: {
    opacity: 0.5,
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadingText: {
    color: colors.BLACK,
    fontSize: 12,
  },
});

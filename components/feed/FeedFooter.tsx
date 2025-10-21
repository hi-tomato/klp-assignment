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
  const { pickImage, uploadMultipleImages, uploading } = useImageUploader();

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
          size={24}
          color={uploading ? colors.GRAY_500 : colors.PRIMARY}
        />
      </Pressable>

      {uploading && (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="small" color={colors.PRIMARY} />
          <Text style={styles.uploadingText}>업로드 중...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: colors.BORDER_LIGHT,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 4,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 12,
    borderRadius: 8,
  },
  footerIconDisabled: {
    opacity: 0.5,
  },
  uploadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
  },
  uploadingText: {
    color: colors.TEXT_SECONDARY,
    fontSize: 13,
    fontWeight: "500",
  },
});

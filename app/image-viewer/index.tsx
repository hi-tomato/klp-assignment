import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
// import {  } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ImageViewerScreen = () => {
  const inset = useSafeAreaInsets();
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();

  console.log("전달받은 imageUri: ", imageUri);

  return (
    <View style={[styles.container, { marginTop: inset.top + 10 }]}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color={"white"} />
      </Pressable>
      <Image
        source={{ uri: imageUri }}
        style={{ width: Dimensions.get("window").width, height: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    backgroundColor: colors.BLACK,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

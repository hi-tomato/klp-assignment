import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

interface ImagePreviewProps {
  imageUris: string[];
}

export default function ImagePreview({ imageUris = [] }: ImagePreviewProps) {
  console.log("imageUris: ", imageUris);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map((imageUri, index) => (
        <Pressable
          style={styles.imageContainer}
          key={index}
          onPress={() => {
            router.push({
              pathname: "/image-viewer",
              params: { imageUri: encodeURIComponent(imageUri) },
            });
          }}
        >
          <Image source={{ uri: imageUri }} style={styles.image} />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

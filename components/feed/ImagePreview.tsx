import React from "react";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";

interface ImagePreviewProps {
  imageUris: string[];
}

export default function ImagePreview({ imageUris = [] }: ImagePreviewProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {imageUris.map((imageUri, index) => (
        <Pressable style={styles.imageContainer} key={index}>
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

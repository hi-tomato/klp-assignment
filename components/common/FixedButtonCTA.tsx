import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "./CustomButton";

interface FixedButtonCTAProps {
  label: string;
  onPress: () => void;
}

export default function FixedButtonCTA({
  label,
  onPress,
}: FixedButtonCTAProps) {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.fixed, { paddingBottom: inset.bottom }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GRAY_300,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

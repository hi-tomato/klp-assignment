import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import React, { useMemo } from "react";
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
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.fixed, { paddingBottom: inset.bottom }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    fixed: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: colors.CARD_BACKGROUND,
      borderTopWidth: 1,
      borderTopColor: colors.BORDER_LIGHT,
      paddingTop: 16,
      paddingHorizontal: 16,
      shadowColor: colors.BLACK,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
  });

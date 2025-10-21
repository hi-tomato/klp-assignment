import { colors, darkColors } from "@/constants/colors";

export const getColors = (isDarkMode: boolean) => {
  if (isDarkMode) {
    return {
      ...colors,
      BACKGROUND: darkColors.BACKGROUND,
      BACKGROUND_SECONDARY: darkColors.BACKGROUND_SECONDARY,
      BORDER_LIGHT: darkColors.BORDER_LIGHT,
      BORDER_DEFAULT: darkColors.BORDER_DEFAULT,
      TEXT_PRIMARY: darkColors.TEXT_PRIMARY,
      TEXT_SECONDARY: darkColors.TEXT_SECONDARY,
      TEXT_TERTIARY: darkColors.TEXT_TERTIARY,
      CARD_BACKGROUND: darkColors.CARD_BACKGROUND,
    };
  }

  return {
    ...colors,
    CARD_BACKGROUND: colors.WHITE,
  };
};

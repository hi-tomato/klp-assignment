import CustomButton from "@/components/common/CustomButton";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export default function AuthScreen() {
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/image.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="로그인 하러가기"
          size="large"
          onPress={() => router.push("/auth/login")}
        />
        <Link href="/auth/signup" style={styles.signUpLink}>
          회원가입 하러가기
        </Link>
      </View>
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
    },
    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 128,
      height: 128,
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: 32,
    },
    signUpLink: {
      marginTop: 16,
      textAlign: "center",
      color: colors.TEXT_SECONDARY,
      fontSize: 16,
      fontWeight: "600",
    },
  });

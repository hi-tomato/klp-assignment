import CustomButton from "@/components/common/CustomButton";
import { colors } from "@/constants/colors";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/favicon.png")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 224,
    height: 224,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  signUpLink: {
    marginTop: 16,
    textAlign: "center",
    color: colors.GRAY_700,
  },
});

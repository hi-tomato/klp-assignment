import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";

import AuthRoutes from "@/components/AuthRoutes";
import { useAuthStore } from "@/store/useAuthStore";
import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageSettingScreen() {
  const { user, logout } = useAuthStore();
  const { isDarkMode, loading, setIsDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);

  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/auth/login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AuthRoutes>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView style={styles.scrollView}>
          {/* 헤더 섹션 */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>설정</Text>
            <Text style={styles.subtitle}>앱 설정 및 계정 관리</Text>
          </View>

          {/* 계정 정보 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>계정 정보</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>이메일</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>닉네임</Text>
                <Text style={styles.infoValue}>
                  {user?.displayName || "익명 사용자"}
                </Text>
              </View>
            </View>
          </View>

          {/* 설정 메뉴 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>일반</Text>

            {/* 다크모드 토글 */}
            <View style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons
                  name={isDarkMode ? "moon" : "sunny-outline"}
                  size={22}
                  color={isDarkMode ? colors.WHITE : colors.BLACK}
                />
                <Text style={styles.menuText}>다크모드</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{
                  false: colors.GRAY_300,
                  true: colors.PRIMARY_LIGHT,
                }}
                thumbColor={isDarkMode ? colors.PRIMARY : colors.WHITE}
              />
            </View>

            <View style={styles.divider} />

            <Pressable style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={isDarkMode ? colors.WHITE : colors.TEXT_PRIMARY}
                />
                <Text style={styles.menuText}>알림 설정</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDarkMode ? colors.WHITE : colors.TEXT_TERTIARY}
              />
            </Pressable>

            <View style={styles.divider} />

            <Pressable style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Ionicons
                  name="information-circle-outline"
                  size={22}
                  color={isDarkMode ? colors.WHITE : colors.TEXT_PRIMARY}
                />
                <Text style={styles.menuText}>버전 정보</Text>
              </View>
              <Text style={styles.versionText}>v1.0.0</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>계정</Text>
            <Pressable style={styles.dangerButton} onPress={handleLogout}>
              <Ionicons
                name="log-out-outline"
                size={22}
                color={colors.DANGER}
              />
              <Text style={styles.dangerText}>로그아웃</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthRoutes>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_SECONDARY,
    },
    scrollView: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
    },
    headerSection: {
      backgroundColor: colors.CARD_BACKGROUND,
      paddingHorizontal: 20,
      paddingTop: 32,
      paddingBottom: 24,
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.TEXT_PRIMARY,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.TEXT_SECONDARY,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      paddingHorizontal: 20,
      marginBottom: 8,
    },
    infoCard: {
      backgroundColor: colors.CARD_BACKGROUND,
      paddingVertical: 8,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    infoLabel: {
      fontSize: 16,
      color: colors.TEXT_PRIMARY,
      fontWeight: "500",
    },
    infoValue: {
      fontSize: 16,
      color: colors.TEXT_SECONDARY,
    },
    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.CARD_BACKGROUND,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    menuText: {
      fontSize: 16,
      color: colors.TEXT_PRIMARY,
      fontWeight: "500",
    },
    versionText: {
      fontSize: 14,
      color: colors.TEXT_TERTIARY,
    },
    divider: {
      height: 1,
      backgroundColor: colors.BORDER_LIGHT,
      marginLeft: 20,
    },
    dangerButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.CARD_BACKGROUND,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    dangerText: {
      fontSize: 16,
      color: colors.DANGER,
      fontWeight: "600",
    },
  });

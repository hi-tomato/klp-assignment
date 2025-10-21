import { useDarkModeStore } from "@/store/useDarkModeStore";
import { getColors } from "@/util/getColors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import InputField from "../common/InputField";

interface FeedSearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function FeedSearchBar({
  onSearch,
  loading,
}: FeedSearchBarProps) {
  const { isDarkMode } = useDarkModeStore();
  const colors = getColors(isDarkMode);
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!search.trim()) {
      onSearch("");
      return;
    }

    const debounce = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, onSearch]);

  const handleSearch = (text: string) => setSearch(text);

  return (
    <View style={styles.container}>
      <InputField
        placeholder="글 검색 또는 제목을 입력해주세요."
        value={search}
        style={styles.input}
        onChangeText={handleSearch}
        rightElement={
          loading ? (
            <ActivityIndicator size="small" color={colors.GRAY_500} />
          ) : (
            <Ionicons name="search" size={18} color={colors.GRAY_500} />
          )
        }
      />
    </View>
  );
}

const createStyles = (colors: ReturnType<typeof getColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    input: {
      flex: 1,
    },
  });

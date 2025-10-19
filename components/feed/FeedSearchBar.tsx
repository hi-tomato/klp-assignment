import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
});

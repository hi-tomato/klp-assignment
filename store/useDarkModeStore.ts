import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type DarkModeState = {
  isDarkMode: boolean;
  loading: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  loadDarkMode: () => Promise<void>;
};

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  loading: true,
  setIsDarkMode: async (isDarkMode: boolean) => {
    set({ isDarkMode });
    try {
      await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error:", error);
    }
  },
  loadDarkMode: async () => {
    try {
      const stored = await AsyncStorage.getItem("isDarkMode");
      if (stored !== null) {
        set({ isDarkMode: JSON.parse(stored) });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));

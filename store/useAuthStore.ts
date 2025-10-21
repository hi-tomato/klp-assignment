import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  initializing: boolean;
  loading: boolean;
  error: Error | null;
  setUser: (user: User | null) => void;
  setInitializing: (value: boolean) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: auth.currentUser,
  initializing: true,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  setInitializing: (value: boolean) => set({ initializing: value }),
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
    } catch (error) {
      set({ error: error as Error });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

onAuthStateChanged(auth, (user) => {
  const { setUser, setInitializing } = useAuthStore.getState();

  if (user) {
    const currentUser = useAuthStore.getState().user;
    if (!currentUser || currentUser.uid !== user.uid) {
      setUser(user);
    }
  } else {
    setUser(null);
  }

  setInitializing(false);
});

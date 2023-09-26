import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TUser } from "../service/types";

type AuthStore = {
  user: TUser | null;
  token: string;
  actions: {
    setUser: (user: TUser) => void;
    setToken: (token: string) => void;
    logout: () => void;
  };
};

type TThemeStore = {
  theme: string;
  actions: {
    setTheme: (theme: string) => void;
  };
};

const initialState = {
  user: null,
  token: "",
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        logout: () => set({ ...initialState }),
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

export const useThemeStore = create<TThemeStore>()(
  persist(
    (set) => ({
      theme: "dracula",
      actions: {
        setTheme: (theme) => set({ theme }),
      },
    }),
    {
      name: "theme",
      partialize: (state) => ({
        theme: state.theme,
      }),
    },
  ),
);

export const useTheme = () => useThemeStore((state) => state.theme);
export const useThemeActions = () => useThemeStore((state) => state.actions);
export const useUser = () => useAuthStore((state) => state.user);
export const useToken = () => useAuthStore((state) => state.token);
export const useAuthActions = () => useAuthStore((state) => state.actions);

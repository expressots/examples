import { ReactElement, createContext, useContext, useState } from "react";
import { useAuthActions, useUser } from "../store";

type TAuthProviderProps = {
  children: ReactElement;
};

const AuthContext = createContext({});

function AuthProvider({ children }: TAuthProviderProps) {
  const { logout } = useAuthActions();
  const user = useUser();

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };

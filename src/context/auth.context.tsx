import { User } from "firebase/auth";
import { ReactNode, createContext, useMemo } from "react";
import { useAuth } from "src/hooks/useAuth";

interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, logOut, signUp, signIn, user } = useAuth();

  const value = useMemo(
    () => ({
      error,
      isLoading,
      logOut,
      signUp,
      signIn,
      user,
    }),
    // eslint-disable-next-line
    [error, isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

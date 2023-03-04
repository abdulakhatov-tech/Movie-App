import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, createContext, useMemo, useEffect, useState } from "react";
import { auth } from "src/firebase";
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
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const {
    error,
    isLoading,
    logOut,
    signUp,
    signIn,
    user,
    setUser,
    setIsLoading,
  } = useAuth();
  const router = useRouter();

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

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoading(false);
          setUser(user);
        } else {
          setUser(null);
          setIsLoading(true);
          router.push("/auth");
        }
        setIsLoading(false);
        setInitialLoader(false);
      }),

    // eslint-disable-next-line
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

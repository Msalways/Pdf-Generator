import { createContext, useContext, type ReactNode } from "react";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string) => Promise<any>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  validateSession = true,
}: {
  children: ReactNode;
  validateSession?: boolean;
}) => {
  return (
    <AuthContext.Provider
      value={{
        user: null,
        loading: false,
        login: async () => {},
        logout: async () => {},
        signUp: async () => {},
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

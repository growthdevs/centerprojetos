import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: "client" | "designer" | null;
  userName: string | null;
  login: (username: string, password: string, type: "client" | "designer") => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const MOCK_CREDENTIALS = {
  designer: { usernames: ["projetista", "projetista@gmail.com"], password: "123456", name: "Projetista Demo" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<"client" | "designer" | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const login = (username: string, password: string, type: "client" | "designer"): boolean => {
    if (type === "designer") {
      if (
        MOCK_CREDENTIALS.designer.usernames.includes(username.toLowerCase()) &&
        password === MOCK_CREDENTIALS.designer.password
      ) {
        setIsAuthenticated(true);
        setUserType("designer");
        setUserName(MOCK_CREDENTIALS.designer.name);
        return true;
      }
    }
    // For client, accept any credentials for now (mock)
    if (type === "client") {
      setIsAuthenticated(true);
      setUserType("client");
      setUserName("Cliente");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

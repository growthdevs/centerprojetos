import { createContext, useContext, useState, ReactNode } from "react";

export type ClientPlan = "smart" | "premium" | null;
export type UserType = "client" | "designer" | "shopowner" | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  userName: string | null;
  clientPlan: ClientPlan;
  login: (username: string, password: string, type: "client" | "designer" | "shopowner") => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials
const MOCK_CREDENTIALS = {
  designer: { usernames: ["projetista", "projetista@gmail.com"], password: "123456", name: "Projetista Demo" },
  clientSmart: { usernames: ["cliente", "cliente@gmail.com"], password: "123456", name: "Cliente Smart" },
  clientPremium: { usernames: ["clientepremium", "clientepremium@gmail.com"], password: "123456", name: "Cliente Premium" },
  shopowner: { usernames: ["lojista", "lojista@gmail.com"], password: "123456", name: "Lojista Demo" },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [clientPlan, setClientPlan] = useState<ClientPlan>(null);

  const login = (username: string, password: string, type: "client" | "designer" | "shopowner"): boolean => {
    if (type === "designer") {
      if (
        MOCK_CREDENTIALS.designer.usernames.includes(username.toLowerCase()) &&
        password === MOCK_CREDENTIALS.designer.password
      ) {
        setIsAuthenticated(true);
        setUserType("designer");
        setUserName(MOCK_CREDENTIALS.designer.name);
        setClientPlan(null);
        return true;
      }
    }

    if (type === "shopowner") {
      if (
        MOCK_CREDENTIALS.shopowner.usernames.includes(username.toLowerCase()) &&
        password === MOCK_CREDENTIALS.shopowner.password
      ) {
        setIsAuthenticated(true);
        setUserType("shopowner");
        setUserName(MOCK_CREDENTIALS.shopowner.name);
        setClientPlan(null);
        return true;
      }
    }

    // Client login - check for premium first, then smart
    if (type === "client") {
      // Check Premium credentials
      if (
        MOCK_CREDENTIALS.clientPremium.usernames.includes(username.toLowerCase()) &&
        password === MOCK_CREDENTIALS.clientPremium.password
      ) {
        setIsAuthenticated(true);
        setUserType("client");
        setUserName(MOCK_CREDENTIALS.clientPremium.name);
        setClientPlan("premium");
        return true;
      }
      // Check Smart credentials
      if (
        MOCK_CREDENTIALS.clientSmart.usernames.includes(username.toLowerCase()) &&
        password === MOCK_CREDENTIALS.clientSmart.password
      ) {
        setIsAuthenticated(true);
        setUserType("client");
        setUserName(MOCK_CREDENTIALS.clientSmart.name);
        setClientPlan("smart");
        return true;
      }
      // Default: any other client credentials → smart plan
      setIsAuthenticated(true);
      setUserType("client");
      setUserName("Cliente");
      setClientPlan("smart");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserName(null);
    setClientPlan(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, userName, clientPlan, login, logout }}>
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

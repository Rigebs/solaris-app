import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, [user]);

  // mock storage for credentials (ONLY for demo)
  const getUsers = () => {
    const raw = localStorage.getItem("mock_users");
    return raw ? JSON.parse(raw) : [];
  };
  const saveUsers = (arr: any[]) =>
    localStorage.setItem("mock_users", JSON.stringify(arr));

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password };
    saveUsers([...users, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

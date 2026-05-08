import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    setUser({
      id: 1,
      email: email || "admin@company.se",
      firstName: "Jennifer",
      lastName: "Hägg",
      phone: "070-123 45 67",
      role: "Admin",
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === "Admin";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
import { useState, createContext, useContext } from "react";
const API = import.meta.env.VITE_API_BASE;
export const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}

export function AuthProvider({ children }) {
  function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
      // This line should only ever run if AuthProvider isn't mounted above
      throw new Error("useAuth must be used inside an <AuthProvider>");
    }
    return context;
  }

  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function login(credentials) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setToken(data.token);
      sessionStorage.setItem("token", data.token);
      setUser(data.user || null);
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
  }

  const value = { token, user, loading, error, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
  }

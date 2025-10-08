import { useState, useEffect, createContext, useContext } from "react";

export const API = import.meta.env.VITE_API_BASE;
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function register(credentials) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      if (data.token) {
        setToken(data.token);
        sessionStorage.setItem("token", data.token);
        setUser(data.user || null);
      }
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    if (!token) return;
    async function fetchUser() {
      try {
        const res = await fetch(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch user");
        setUser(data);
      } catch (err) {
        console.error("fetchUser error:", err);
        setError(err.message);
      }
    }
    fetchUser();
  }, [token]);

  const value = {
    token,
    user,
    loading,
    error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return context;
}

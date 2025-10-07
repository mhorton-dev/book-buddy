import { createContext, useContext, useEffect, useState } from "react";

import { API } from "../api/ApiContext.jsx";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
}

export function useAuth() {
  try {
    const context = useContext(AuthContext);
    if (!context) throw Error(`useAuth context) ${Error}`);
  } catch (err) {
    console.error(`useAuth threw ${err}`);
  }
}

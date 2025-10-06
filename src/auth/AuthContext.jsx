import { createContext, useContext, useEffect, useState } from "react";

import { API } from "../api/ApiContext.js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

  const register = async (credentials) => {
    const response = async fetch(API + "users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
  }

  const login = async(credentials) => {
    const response = await fetch (API + users/login, {
        method "POST"
    })
  }
}

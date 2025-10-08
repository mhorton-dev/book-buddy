import { createContext, useContext } from "react";
import { useAuth } from "../auth/AuthContext.jsx";

const ApiContext = createContext();

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used inside an <ApiProvider>");
  }
  return context;
}

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };

  if (token) headers.Authorization = `Bearer ${token}`;

  async function request(resource, options = {}) {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}${resource}`,
      {
        ...options,
        headers,
      }
    );
    const isJson = response.headers
      .get("Content-Type")
      ?.includes("application/json");
    const result = isJson ? await response.json() : await response.text();
    if (!response.ok) throw result;
    return result;
  }

  const value = { request };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

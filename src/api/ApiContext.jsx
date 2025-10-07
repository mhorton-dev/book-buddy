import { createContext, useContext, useState } from "react";
import { useAuth } from "../api/AuthContext.jsx";

export const API = import.meta.env.VITE_API_BASE;
export const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const { token } = useAuth();
  const headers = { "Content-Type": "application/json" };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const request = async (resource, options) => {
    const response = await fetch(`${API}${resource}`, {
      headers,
      ...options,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : await response.text();
    if (!response.ok) throw result;
    return result;
  };

  const [tags, setTags] = useState([]);
  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };
  const invalidateTags = (invalidTags) => {
    invalidTags.forEach((tag) => tags[tag]?.());
  };

  const value = { request, provideTag, invalidateTags };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

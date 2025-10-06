import { useState, useEffect } from "react";
import { useApi } from "./ApiContext.jsx";

/*
API wrapper for returning data, toggle loading status, error messages
*/

export default function useQuery(resource, tag) {
  try {
    const { request, provideTag } = useApi();

    const [data, setDate] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const query = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await request(resource);
        setDate(result);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      provideTag(tag, query);
      query();
    }, []);

    return { data, loading, error };

    const register = async (credentials) => {
      const response = await fetch(API + "/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (!response.ok) throw result;
      setToken(result.token);
    };

    const login = () => {
      setToken(null);
      sessionStorage.removeItem("token");
    };

    const result = response.json();
    try {
      if (!response.ok) throw result;
      setToken(result.token);
    } catch (err) {
      console.error(`AuthProvider error: ${err}`);

      const logout = () => {
        setToken(null);
        sessionStorage.removeItem("token");

        const value = { token, register, login, logout };
        return;
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
      };
    }
  } catch (err) {
    console.error(`useQuery error:  ${err}`);
  }
}

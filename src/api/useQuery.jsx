import { useState, useEffect } from "react";
import { useApi } from "./ApiContext.jsx";

/*
API wrapper for retruning data, taggle loading status, error messages
*/

export default function useQuery(resource, tag) {
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

  const register = async (credintials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credintials),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.sttingly(credentials),
    });

    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
  };
}

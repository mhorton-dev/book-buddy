import { useState } from "react";
import { useApi } from "./ApiContext.jsx";
import { useAuth } from "../auth/AuthContext.jsx";

export default function useMutation(method, resource, invalidateTags = []) {
  const { request, invalidateTags: invalidate } = useApi();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function mutate(body) {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      invalidate(invalidateTags);
      return result;
    } catch (err) {
      console.error("Mutation error:", err);
      setError(err.message || err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, loading, error };
}

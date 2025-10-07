import { useState } from "react";
import { useApi } from "./ApiContext.jsx";

function useMutation(resource, options = {}) {
  const { request } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource, {
        method: options.method || "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setData(result);
      return result;
    } catch (err) {
      console.error("Mutation error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}

export default useMutation; // ✅ add this

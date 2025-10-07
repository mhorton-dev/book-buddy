import { useState, useEffect } from "react";
import { useApi } from "./ApiContext.jsx";

/*
API wrapper for returning data, toggle loading status, error messages
*/

export default function useQuery(resource, tag) {
  const { request, provideTag } = useApi();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const result = await request(resource);
      setData(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (tag) provideTag(tag, fetchData);
    fetchData();
  }, [resource]);

  return { data, loading, error };
}

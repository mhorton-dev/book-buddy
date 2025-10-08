import { useState, useEffect } from "react";
import { useApi } from "./ApiContext.jsx";

export default function useQuery(resource, tag) {
  const { request, provideTag } = useApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; //useEfect kept re-rendering

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await request(resource);
        if (!ignore) setData(result);
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError(err.message || "Failed to fetch data");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (tag && typeof provideTag === "function") {
      provideTag(tag, fetchData);
    }

    fetchData();
    return () => {
      ignore = true; // cleanup for unmounted components
    };
  }, [request, provideTag, resource, tag]);

  return { data, loading, error };
}

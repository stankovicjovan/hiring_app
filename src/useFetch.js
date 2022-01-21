import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, { signal: abortControl.signal })
      .then((response) => {
        if (!response.ok) throw Error("Failed to fetch the data!");

        return response.json();
      })
      .then((resData) => {
        setData(resData);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") return;

        setError(error.message);
        setIsLoading(false);
      });

    return () => abortControl.abort();
    //
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;

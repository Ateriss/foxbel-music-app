import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Hooks
import useDebounce from "./useDebounce";

const useSearch = (url) => {
  // States
  const [value, setValue] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Custom Hooks
  const debouncedValue = useDebounce(value, 200);

  // Handlers
  const handleChange = (value) => {
    setValue(value);
  };

  const handleOnSearch = useCallback(
    async (q) => {
      try {
        const res = await axios.get(url, {
          params: { q },
          headers: {
            "X-RapidAPI-Key":
              "87dbfd2d19msh7547c9706d7f324p100389jsnd59b94576303",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        });
        setResponse(res?.data?.data);
      } catch (error) {
        setError(error);
      }
    },
    [url]
  );

  // Effects
  useEffect(() => {
    if (debouncedValue.length) {
      handleOnSearch(debouncedValue);
    }
  }, [debouncedValue, handleOnSearch]);

  return {
    data: response,
    error,
    value,
    handleChange,
  };
};

export default useSearch;

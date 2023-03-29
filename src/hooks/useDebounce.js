import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  // States
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook that returns a debounced value.
 * The returned value only updates after the specified delay
 * has elapsed with no new changes.
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Debounce delay in milliseconds (default 300)
 * @returns {*} The debounced value
 */
export function useDebounceValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that returns a debounced callback function.
 * The callback is only invoked after the specified delay
 * has elapsed with no new calls.
 *
 * @param {Function} callback - The function to debounce
 * @param {number} delay - Debounce delay in milliseconds (default 300)
 * @returns {Function} The debounced callback
 */
export function useDebouncedCallback(callback, delay = 300) {
  const timerRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFn;
}

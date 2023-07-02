import { useEffect, useRef } from "react";

// T is called generic type means it'll automatically adapt whatever the type is given
// when we called the usePrevious hook and gives the value it won't be necessary to define type as it will automatically adapts the type
export function usePrevious<T>(value: T): T | null {
  // useRef like document.getElementById or QuereySelector to store the value of field
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current ?? null;
};
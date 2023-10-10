import { useEffect, useState } from "react";

export function useScreen() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  return width;
}

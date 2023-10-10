import { useEffect } from "react";

export function screen() {
      useEffect(() => {
        const updateWindowDimensions = () => {
          const newWidth = window.innerWidth;
          return newWidth;
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions) 
      }, []);
}
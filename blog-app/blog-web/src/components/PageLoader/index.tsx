import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function PageLoader(): JSX.Element {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(true);
  }, [])
  return (
    <div className="inset-0 flex items-center justify-center fixed">
      <div className={`transition-all duration-700 ${state ? "opacity-1" : "opacity-0"}`}>
        Blog App 
        <RotatingLines 
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.80"
          width="55"
          visible={true}
        />
      </div>
    </div>
  )
}

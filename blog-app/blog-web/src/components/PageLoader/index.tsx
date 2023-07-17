import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

export default function PageLoader(): JSX.Element {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(true);
  }, [])

  const flexClass = "flex items-center justify-center"

  return (
    <div className={`inset-0 ${flexClass} fixed`}>
      <div className={`${flexClass} transition ease-in-out delay-750 ${state ? "opacity-1" : "opacity-0"}`}>
        <h1>
          Blog App 
        </h1>
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

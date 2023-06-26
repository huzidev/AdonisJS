import { useEffect, useState } from "react";

export default function PageLoader(): JSX.Element {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);
  return (
    <div>
      Blog App
      {!state && (
      <>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          </div>
        </>
      ) }
    </div>
  )
}

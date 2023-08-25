import { useEffect, useState } from "react";
import { useAuth } from "store/auth";

export default function ToggleThemePopUpPage() {
    const auth = useAuth();
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        setState(true)
    }, [])

  return (
    <div className={`h-screen flex justify-center items-center`}>
        {state && (
            <h1 className="transition ease-in-out delay-700">
                Yours Theme has been changed to {auth.state.isDark ? "Dark" : "Light"}{" "}
                Mode
            </h1>
        )}
    </div>
  );
}

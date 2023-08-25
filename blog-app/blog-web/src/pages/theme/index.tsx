import { useEffect, useState } from "react";
import { useAuth } from "store/auth";

export default function ToggleThemePopUpPage() {
    const auth = useAuth();
    const [state, setState] = useState<boolean>(false);
    const [text, setText] = useState<boolean>(false);

    useEffect(() => {
        // setTimeout(() => {
        //     setState(true);
        // }, 700)
        setTimeout(() => {
            setText(true);
        }, 500)
    }, [])

  return (
    <div className={`h-screen flex justify-center items-center dark:bg-[#181a1b]`}>
        {/* {state && ( */}
            <h1 className={` dark:text-white ${text ? 'dark:text-neutral-700' : 'dark:text-white'}`}>
                Yours Theme has been changed to {auth.state.isDark ? "Dark" : "Light"}{" "}
                Mode
            </h1>
        {/* )} */}
    </div>
  );
}

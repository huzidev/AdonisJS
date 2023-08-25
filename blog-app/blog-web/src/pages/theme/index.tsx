import { useEffect, useState } from "react";
import { PropsType } from "./types";

export default function ToggleThemePopUpPage(props: PropsType): JSX.Element {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  useEffect(() => {
    if (props.isDark) {
      setDarkTheme(true);
    } else {
      setLightTheme(true);
    }
  }, [props.isDark]);

  return (
    <div
      className={`h-screen flex justify-center items-center transition ease-in-out duration-700 ${
        darkTheme && "bg-[#181a1b]"
      } ${lightTheme && "bg-white"}`}
    >
      <h1 className="dark:text-white">
        Yours Theme has been changed to {props.isDark ? "Dark" : "Light"} Mode
      </h1>
    </div>
  );
}

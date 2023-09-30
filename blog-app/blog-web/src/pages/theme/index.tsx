import { useEffect, useState } from "react";
import "./styles.css";

interface PropsType {
  isDark: boolean;
}
export default function ToggleThemePopUpPage(props: PropsType): JSX.Element {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [lightTheme, setLightTheme] = useState<boolean>(false);

  useEffect(() => {
    if (props.isDark) {
      setTimeout(() => {
        setDarkTheme(true);
      }, 200);
    } else {
      setTimeout(() => {
        setLightTheme(true);
      }, 200);
    }
  }, [props.isDark]);

  return (
    <div
      className={`h-screen flex justify-center items-center animation ${
        props.isDark
          ? (!darkTheme && "bg-white") || (darkTheme && "bg-[#181a1b]")
          : (!lightTheme && "bg-[#181a1b]") || (lightTheme && "bg-white")
      }`}
    >
      <div>
        <div className="container text-center">
          <label
            htmlFor="theme-toggle"
            className={`custom-checkbox animation ${
              props.isDark
                ? (!darkTheme && "bg-orange-400") ||
                  (darkTheme && "bg-transparent checked-box-shadow")
                : (!lightTheme && "bg-transparent checked-box-shadow") ||
                  (lightTheme && "bg-orange-400")
            }`}
          ></label>
        </div>
        <h1
          className={`animation text-xl ${
            props.isDark
              ? (!darkTheme && "text-black") || (darkTheme && "text-white")
              : (!lightTheme && "text-white") || (lightTheme && "text-black")
          }`}
        >
          Yours Theme has been changed to {props.isDark ? "Dark" : "Light"} Mode
        </h1>
      </div>
    </div>
  );
}

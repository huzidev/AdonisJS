import { useEffect, useState } from "react";

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
      }, 200)
    }
  }, [props.isDark]);

  return (
    <div
      className={`h-screen flex justify-center items-center transition ease-in-out duration-700 ${props.isDark ? 'bg-white' : 'bg-[#181a1b]'} ${
        darkTheme && "dark:bg-[#181a1b]" || lightTheme && "bg-white"}`}
    >
      <div>
        <h1 className={`transition ease-in-out duration-700 ${props.isDark ? 'text-blue' : 'text-white'} ${darkTheme && 'text-white' || lightTheme && 'text-black'}`}>
          Yours Theme has been changed to {props.isDark ? "Dark" : "Light"} Mode
        </h1>
            <div className={`transition ease-in-out delay-750  ${darkTheme || lightTheme ? 'opacity-1' : 'opacity-0'}`}>
              <h1 className="text-white dark:text-white">
                {darkTheme && 'Moon Icon'}
                {lightTheme && 'Sun Icon'}
              </h1>
            </div>
      </div>
    </div>
  );
}

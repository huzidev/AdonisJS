import { useEffect, useState } from "react";
import './styles.css';

interface PropsType {
    isDark: boolean;
}
export default function ToggleThemePopUpPage(props: PropsType): JSX.Element {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
    setTimeout(() => {
      setIsClicked(true);
    }, 200)
  }, [props.isDark]);

  return (
    // <div
    //   className={`h-screen flex justify-center items-center animation ${props.isDark ? 'bg-white' : 'bg-[#181a1b]'} ${
    //     darkTheme && "dark:bg-[#181a1b]" || lightTheme && "bg-white"}`}
    // >
      // <div
      // className={`h-screen flex justify-center items-center animation ${props.isDark ? 'bg-white' : 'bg-[#181a1b]'} ${
      //   (darkTheme && !lightTheme) && "bg-[#181a1b]" || (lightTheme && !darkTheme) && "bg-white"}`}
      // >
      <div className={`h-screen flex justify-center items-center animation ${
        props.isDark ? (!darkTheme && 'bg-white') || (darkTheme && 'bg-[#181a1b]') : (!lightTheme && 'bg-[#181a1b]') || (lightTheme && 'bg-white')
      }`}

      >
      <div>
        {/* <h1 className={`animation  ${props.isDark || (!darkTheme || !lightTheme) ? 'text-black' : 'text-white'} ${darkTheme && 'text-white' || lightTheme && 'text-blue-300'}`}> */}
        <h1
          className={`animation ${
            props.isDark ? (!darkTheme && 'text-black') || (darkTheme && 'text-white') : (!lightTheme && 'text-white') || (lightTheme && 'text-black') 
          }`}
        >
          Yours Theme has been changed to {props.isDark ? "Dark" : "Light"} Mode
        </h1>
          <div className="container">
              <label htmlFor="theme-toggle" className={`custom-checkbox animation ${
                props.isDark ? (!darkTheme && 'bg-orange-400') || (darkTheme && 'bg-transparent checked-box-shadow') : (!lightTheme && 'bg-transparent checked-box-shadow') || (lightTheme && 'bg-orange-400')
              }`}></label>
          </div>
      </div>
    </div>
  );
}

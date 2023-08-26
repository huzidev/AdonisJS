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
    }, 700)
  }, [props.isDark]);

  return (
    <div
      className={`h-screen flex justify-center items-center animation ${props.isDark ? 'bg-white' : 'bg-[#181a1b]'} ${
        darkTheme && "dark:bg-[#181a1b]" || lightTheme && "bg-white"}`}
    >
      <div>
        {/* <h1 className={`animation  ${props.isDark || (!darkTheme || !lightTheme) ? 'text-black' : 'text-white'} ${darkTheme && 'text-white' || lightTheme && 'text-blue-300'}`}> */}
        <h1 className={`animation ${props.isDark ? (
          'text-black' && darkTheme && 'text-white'
        ) : (
          'text-white' && lightTheme && 'text-black'
        )
      }`}>
          Yours Theme has been changed to {props.isDark ? "Dark" : "Light"} Mode
        </h1>
        {isClicked && (
          <div className="container">
            <input type="checkbox" id="theme-toggle" className={'content-none inline-block cursor-pointer h-20 w-20 rounded-full'} />
            <label htmlFor="theme-toggle"></label>
          </div>
        )}
            <div className="container">
            {/* <input onClick={() => setIsClicked(!isClicked)} type="checkbox" id="theme-toggle" className={`custom-checkbox ${isClicked ? 'bg-transparent checked-box-shadow ' : 'bg-orange-400'}`}/> */}
            <input onClick={() => setIsClicked(!isClicked)} type="checkbox" id="theme-toggle" className='hidden' />
              <label htmlFor="theme-toggle" className={`custom-checkbox ${isClicked ? 'bg-transparent checked-box-shadow' : 'bg-orange-400'}`}></label>
          </div>
      </div>
    </div>
  );
}

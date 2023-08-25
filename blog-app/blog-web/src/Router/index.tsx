import AuthGuard from "components/AuthGuard";
import Nav from "components/Header";
import PageLoader from "components/PageLoader";
import NotFoundPage from "pages/NotFound";
import ToggleThemePopUpPage from "pages/theme";
import { Suspense, useEffect, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "store/auth";
import routes from "./routes";
export default function AppRouter(): JSX.Element {
  const auth = useAuth();
  const [isAuthChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    // so NAV bar won't be shown when initState is in loading
    if (!auth.state.initState.loading && auth.state.initState.init) {
      setAuthChecked(true);
    }
  }, [auth.state.initState]);

  const [isThemeChange, setIsThemeChange] = useState<boolean>(false);
  
  // initial state of dark theme will be true OR false
  const authState: any = auth.state.isDark;
  // holds the initial state wouldn't re-render (re-rendering causes error as each time state gets change and matches the authState which shows pop-up theme window every time when user reloads the page)
  const currentTheme = useRef(authState);
  // holds the currentTheme from useRef to match it with authState and then update when pop-up theme is shown
  const [currentState, setCurrentState] = useState<boolean>(currentTheme.current);

  useEffect(() => {
    // only show pop-up window when currentState !== authState suppose currentState is true(Dark) and authState is also true(Dark) hence only show when they don't matches WHICH means user has toggle the theme
    if (currentState !== authState) {
      setIsThemeChange(true);
      setTimeout(() => {
        // update the currentState to the new state which user has changed so next time when user toggles the theme it'll show pop-up window again otherwise it'll not show the pop-up window when user toggle the theme
        setCurrentState(authState);
        setIsThemeChange(false);
      }, 2000);
    }
  }, [auth.state.isDark]);

  return (
    <>
    {/* conditionally rendering when user changes the theme pop-up components will be shown but not the other until isThemeChange state became false if we don't do the conditional rendering then with pop-up window the other components will also been shown at the bottom  a */}
      {isThemeChange ? (
        <ToggleThemePopUpPage />
      ) : (
        <Router>
          <Suspense fallback={<PageLoader />}>
            {isAuthChecked && <Nav />}
            <Routes>
              {routes.map(({ Component, ...route }) => {
                return (
                  <Route
                    {...route}
                    key={route.path}
                    path={route.path}
                    element={
                      <AuthGuard>
                        <Component />
                      </AuthGuard>
                    }
                  />
                );
              })}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <ToastContainer />
        </Router>
      )}
    </>
  );
}

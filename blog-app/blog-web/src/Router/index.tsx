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

  const currentState = useRef(auth.state.isDark);

  useEffect(() => {
    setIsThemeChange(true);
    setTimeout(() => {
      setIsThemeChange(false);
    }, 2000);
  }, [currentState]);

  return (
    <>
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

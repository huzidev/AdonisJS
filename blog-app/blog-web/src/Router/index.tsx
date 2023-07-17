import AuthGuard from "components/AuthGuard";
import Nav from "components/Header";
import PageLoader from "components/PageLoader";
import NotFoundPage from "pages/NotFound";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Nav />
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
  );
}

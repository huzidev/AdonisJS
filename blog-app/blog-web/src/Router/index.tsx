import AuthGuard from "components/AuthGuard";
import Nav from "components/Header";
import PageLoader from "components/PageLoader";
import { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import NotFoundPage from "../pages/NotFound";
import routes from './routes';
export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Nav />
          <Routes>
          {routes.map(({ Component, path }) => {
          return (
              <Route
                key={path}
                path={path}
                element={
                  <AuthGuard>
                      <Component  />
                  </AuthGuard>
                }
              />
            )
          })} 
          <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </Suspense>
    </Router>
  )
}
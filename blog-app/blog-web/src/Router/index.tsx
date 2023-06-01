import Nav from "components/Header";
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
        <Nav />
        <Routes>
        {routes.map(({ Component, path }) => {
        return (
            <Route
              key={path}
              path={path}
              element={
                  <Component  />
              }
            />
          )
        })} 
        <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    </Router>
  )
}
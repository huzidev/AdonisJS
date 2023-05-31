import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import NotFoundPage from "../components/pages/NotFound";
import { routes } from './routes';
export default function AppRouter(): JSX.Element {
  return (
    <Router>
        <Routes>
        {routes.map(({ exact, Component, path }) => {
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
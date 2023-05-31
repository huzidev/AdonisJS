import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import Nav from "../components/nav/Nav";
import NotFoundPage from "../components/pages/NotFound";
import { routes } from './routes';
export default function AppRouter(): JSX.Element {
  return (
    <Router>
        <Nav />
        <Routes>
        {routes.map(({ Component, ...route }) => {
        return (
            <Route
            {...route}
            key={route.path}
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
import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import { routes } from './routes';
export default function AppRouter(): JSX.Element {
  return (
    <Router>
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
        <Route path="*" element={<Error />}/>
        </Routes>
    </Router>
  )
}
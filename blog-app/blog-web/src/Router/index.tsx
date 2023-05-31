import {
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom";
import routes from './Router/routes';
export default function AppRouter(): JSX.Element {
  return (
      <UserState>
        <Router>
          <Routes>
          {routes.map(({ Component, path }) => {
            return (
              <Route
              key={path}
              path={path}
              element={
                <PageWrapper>
                  <Component  />
                </PageWrapper>
              }
              />
            )
          })} 
            <Route path="*" element={<Error />}/>
          </Routes>
        </Router>
      </UserState>
  )
}
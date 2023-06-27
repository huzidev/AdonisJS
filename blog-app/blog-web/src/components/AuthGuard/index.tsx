import ROUTE_PATHS from "Router/paths";
import PageLoader from "components/PageLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const auth = useAuth();
    const Navigate = useNavigate();
    const currentPath = window.location.pathname;

    useEffect(() => {
      const { init } = auth.state;
      if (!init.init && !init.loading) {
        auth.initUser();
      }
      // if loggedIn User
      if (auth.state.user && 
        (currentPath === ROUTE_PATHS.AUTH_SIGNIN || currentPath === ROUTE_PATHS.AUTH_SIGNUP)
        ) {
        Navigate("/");
      } else if (!auth.state.user && 
        (currentPath === ROUTE_PATHS.VIEW_PROFILE || currentPath === ROUTE_PATHS.EDIT_PROFILE)
        ) {
        Navigate(ROUTE_PATHS.AUTH_SIGNIN);
      }
      if (init.init) {
        setState(true);
      }
    }, [auth.state]);

    if (!state) {
      return <PageLoader />;
    }

    return children;
}

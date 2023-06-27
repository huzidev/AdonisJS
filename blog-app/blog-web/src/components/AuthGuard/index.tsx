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
    const Navigate = useNavigate();
    const auth = useAuth();
    const currentPath = window.location.pathname;

    useEffect(() => {
      const { init } = auth.state;
      if (!init.init && !init.loading) {
        auth.initUser();
        return;
      }
      if (!init.init) {
        return;
      }
      if (!auth.state.user) {
        Navigate("/")
      } else if (auth.state.user) {
        if (currentPath === ROUTE_PATHS.AUTH_SIGNIN || currentPath === ROUTE_PATHS.AUTH_SIGNUP) {
          Navigate("/");
        } else {
          setState(true)
        }
      }
      setState(true)
    }, [auth.state]);
    if (!state) {
      return <PageLoader />;
    }
    return children;
}

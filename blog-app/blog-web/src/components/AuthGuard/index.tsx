import ROUTE_PATHS from "Router/paths";
import PageLoader from "components/PageLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { notAllowedPaths } from "./data";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const Navigate = useNavigate();
    const auth = useAuth();
    const currentPath = window.location.pathname;

  const isVerified = auth.state.user?.isVerified;  

    useEffect(() => {
      const { init } = auth.state;
      if (!init.init && !init.loading) {
        auth.initUser();
        return;
      }
      if (!init.init) {
        return;
      }
      // commented it because when user is any other route than "/" and user reloads the page it was sending the user to home page "/"
      // if (!auth.state.user) {
      //   Navigate("/")
      // } 
      if (!auth.state.user && notAllowedPaths.includes(currentPath)) {
        Navigate("/")
      }
      if (auth.state.user) {
        if (currentPath === ROUTE_PATHS.AUTH_SIGNIN || currentPath === ROUTE_PATHS.AUTH_SIGNUP) {
          Navigate("/");
        } else if (!isVerified) {
          Navigate("/verify")
        }
        else {
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

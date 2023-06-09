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

    useEffect(() => {
      const { initState } = auth.state;
      if (!initState.init && !initState.loading) {
        auth.initUser();
        return;
      }
      if (!initState.init) {
        return;
      }
      // commented it because when user is any other route than "/" and user reloads the page it was sending the user to home page "/"
      // if (!auth.state.user) {
      //   Navigate("/")
      // } 
      if (!auth.state.user && notAllowedPaths.includes(currentPath)) {
        Navigate("/")
      }
      else if (auth.state.user) {
        const { isVerified, isBanned } = auth.state.user;
        if (isBanned && currentPath !== ROUTE_PATHS.BANNED_USER) {
          Navigate(ROUTE_PATHS.BANNED_USER);  
        } else if (currentPath === ROUTE_PATHS.AUTH_SIGNIN || currentPath === ROUTE_PATHS.AUTH_SIGNUP) {
          Navigate("/");
        } else if ((!isVerified) && currentPath !== ROUTE_PATHS.VERIFY_USER) {
          Navigate(ROUTE_PATHS.VERIFY_USER)
        } else if (isVerified && currentPath === ROUTE_PATHS.VERIFY_USER) {
          Navigate("/")
        }
        else {
          setState(true)
        }
      }
      else {
        setState(true)
      }
      }, [auth.initUser, auth.state.initState]);
    if (!state) {
      return <PageLoader />;
    }
    return children;
}

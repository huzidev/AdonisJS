import ROUTE_PATHS from "Router/paths";
import routes from "Router/routes";
import PageLoader from "components/PageLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import UrlPattern from "url-pattern";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const navigate = useNavigate();
    const auth = useAuth();
    const currentPath = window.location.pathname;

    const route = routes.find((r) => (
      r.exact ? r.path === currentPath : new UrlPattern(r.path).match(currentPath)
    ))

    // so user can't access the protected path 
    // Ex user can't access the path for blogger and user and blogger and can't access the path for admins 
    const isProtected = !!route?.role;

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
      // if (!auth.state.user && notAllowedPaths.includes(currentPath)) {
      //   navigate("/")
      // }
      if (isProtected && !auth.state.user) {
        navigate('/')
      }
      else if (auth.state.user) {
        const { isVerified, isBanned } = auth.state.user;
        if (isBanned && currentPath !== ROUTE_PATHS.BANNED_USER) {
          navigate(ROUTE_PATHS.BANNED_USER);  
        } else if (currentPath === ROUTE_PATHS.AUTH_SIGNIN || currentPath === ROUTE_PATHS.AUTH_SIGNUP) {
          navigate('/')
        } else if ((!isVerified) && currentPath !== ROUTE_PATHS.VERIFY_USER) {
          navigate(ROUTE_PATHS.VERIFY_USER)
        } else if (isVerified && currentPath === ROUTE_PATHS.VERIFY_USER) {
          navigate('/')
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

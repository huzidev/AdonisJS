import ROUTE_PATHS from "Router/paths";
import routes from "Router/routes";
import PageLoader from "components/PageLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import UrlPattern from "url-pattern";
import { hasPermission } from "utils";
import { errorMessage } from "utils/notifications";

interface AuthGuardProps {
  children: JSX.Element;
}
// AuthGuard component receives children as its props, which represent the components that need to be rendered inside the AuthGuard
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const [state, setState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const currentPath = window.location.pathname;
  const stateSingOut = auth.state.signOutState;

  // when user changes the path then update dark theme
  useEffect(() => {
    if (auth.state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [])

  useEffect(() => {
      if (stateSingOut.loading) {
        setLoading(true)
      } else {
        setLoading(false)
      }
  }, [stateSingOut])

  const route = routes.find((r) =>
    r.exact ? r.path === currentPath : new UrlPattern(r.path).match(currentPath)
  );

  // so user can't access the protected path
  // Ex user can't access the path for blogger and user and blogger and can't access the path for admins
  let isProtected = !!route?.role;
  let allowedRole = route?.role;
  useEffect(() => {
    const { initState, user } = auth.state;
    if (!initState.init && !initState.loading) {
      auth.initUser();
      return;
    }

    if (initState.init) {
      // so loader won't be shown when data is fetched
      setState(true);
    }

    // when user clicked on SignOut button then no matter on which path user is just navigate user to home-page
    if (auth.state.signOutState.loading) {
      navigate('/');
    }

    // if user is not loggedIn and tries to access paths like edit user, create user etc
    if (isProtected && !user && !initState.loading) {
      navigate('/');
      errorMessage("You can't access the requested path kindly signin first");
      errorMessage("You can't access the requested path kindly signin first");
    } else if (user) {
      const { isVerified, isBanned } = user;
      // when user is loggedIn and tries to acces signIn OR signUp path AND check if user isVerified and Not Banned
      if (
        (currentPath === ROUTE_PATHS.AUTH_SIGNIN ||
        currentPath === ROUTE_PATHS.AUTH_SIGNUP) && isVerified && !isBanned
      ) {
        navigate('/');
      } else if (!isVerified && currentPath !== ROUTE_PATHS.VERIFY_USER) {
        navigate(ROUTE_PATHS.VERIFY_USER);
      } else if (isVerified && currentPath === ROUTE_PATHS.VERIFY_USER) {
        navigate('/');
      } else if (isBanned && currentPath !== ROUTE_PATHS.BANNED_USER) {
        navigate(ROUTE_PATHS.BANNED_USER);
      } else if (isProtected && !hasPermission(allowedRole, user.role)) {
        navigate('/');
        errorMessage("Insufficient access, you do not have permission to perform this action");
      } 
      else {
        setState(true);
      }
    } else {
      setState(true);
    }
  }, [auth.state.user, auth.state.initState, auth.state.signOutState, currentPath]);
  if (!state) {
    return <PageLoader />;
  }
  if (loading) {
    return <PageLoader />;
  }
  return children;
}

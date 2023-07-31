import ROUTE_PATHS from "Router/paths";
import routes from "Router/routes";
import PageLoader from "components/PageLoader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "store/auth";
import UrlPattern from "url-pattern";
import { hasPermission } from "utils";

interface AuthGuardProps {
  children: JSX.Element;
}
// AuthGuard component receives children as its props, which represent the components that need to be rendered inside the AuthGuard
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
  const [state, setState] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const currentPath = window.location.pathname;

  const route = routes.find((r) =>
    r.exact ? r.path === currentPath : new UrlPattern(r.path).match(currentPath)
  );

  // so user can't access the protected path
  // Ex user can't access the path for blogger and user and blogger and can't access the path for admins
  const isProtected = !!route?.role;
  const allowedRole = route?.role;
  
  useEffect(() => {
    const { initState, user } = auth.state;
    if (!initState.init && !initState.loading) {
      auth.initUser();
      return;
    }
    if (!initState.init) {
      return;
    }

    // if user is not loggedIn and tries to access paths like edit user, create user etc
    if (isProtected && !user) {
      navigate("/");
      toast.error("You can't access the requested path kindly signin first");
    } 
    else if (user) {
      const { isVerified, isBanned } = user;
      if (isBanned && currentPath !== ROUTE_PATHS.BANNED_USER) {
        navigate(ROUTE_PATHS.BANNED_USER);
      } else if (
        currentPath === ROUTE_PATHS.AUTH_SIGNIN ||
        currentPath === ROUTE_PATHS.AUTH_SIGNUP
      ) {
        navigate("/");
      } else if (!isVerified && currentPath !== ROUTE_PATHS.VERIFY_USER) {
        navigate(ROUTE_PATHS.VERIFY_USER);
      } else if (isVerified && currentPath === ROUTE_PATHS.VERIFY_USER) {
        navigate("/");
      } else if (isProtected && !hasPermission(allowedRole, user.role)) {
        navigate("/");
        toast.error("Insufficient access, you do not have permission to perform this action");
      } else {
        setState(true);
      }
    } else {
      setState(true);
    }
  }, [auth.initUser, auth.state.initState]);
  if (!state) {
    return <PageLoader />;
  }
  return children;
}

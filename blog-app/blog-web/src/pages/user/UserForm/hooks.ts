import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useUserFormHook(): void {
  const auth = useAuth();
  const user = useUser();
  const userRole = user.state.getUser.data?.role;
  const authRole = auth.state.user?.role;
  const state = user.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (prev?.createUser.loading) {
      if (!state?.createUser?.loading && !state.createUser.error) {
        successNotification(state.createUser.message);
        if (state.createUser.message?.includes("successfully")) {
          // users page take pagination meta therefore + 1
          navigate(ROUTE_PATHS.USERS_PAGE + 1)
        }
      }
    }
    if (prev?.updateMe.loading) {
      if (!state.updateMe.loading && !state.updateMe.error) {
       successNotification(state.updateMe.message);
       if (state.updateMe.message?.includes("successfully")) {
            navigate(ROUTE_PATHS.VIEW_PROFILE + "me")
        }
     }
    }
    if (prev?.updateById.loading) {
      if (!state.updateById.loading && !state.updateById.error) {
       successNotification(state.updateById.message);
       if (state.updateById.message?.includes("successfully")) {
            navigate(ROUTE_PATHS.USERS_PAGE  + 1)
        }
     }
    }
    // if user tries to change the id in the URL and that id doesn't exist then redirect the user to Not Found page
    if (prev?.getUser.loading) {
      if (authRole === "admin" && userRole === "super-admin") {
        toast.error("Insufficient Access, You can't edit super-admin's details");
        navigate(ROUTE_PATHS.ARTICLES);
      }
      if (!state.getUser.loading && state.getUser.error) {
        navigate("/");
      }
    }
  }, [state]);
}
import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useUserFormHook(): void {
  const user = useUser();
  const state = user.state;
  const prevAuth = usePrevious(state);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (prevAuth?.createUser.loading) {
      if (!state?.createUser?.loading && !state.createUser.error) {
        successNotification(state.createUser.message);
        if (state.createUser.message?.includes("successfully")) {
            navigate(ROUTE_PATHS.USERS_PAGE)
        }
      }
    }
    if (prevAuth?.updateMe.loading) {
      if (!state.updateMe.loading && !state.updateMe.error) {
       successNotification(state.updateMe.message);
     }
    }
    if (prevAuth?.updateById.loading) {
      if (!state.updateById.loading && !state.updateById.error) {
       successNotification(state.updateById.message);
     }
    }
  }, [state.createUser, state.updateMe, state.updateById]);
}
import { useEffect } from "react";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useUserFormHook(): void {
  const user = useUser();
  const state = user.state;
  const prevAuth = usePrevious(state);
  
  useEffect(() => {
    if (prevAuth?.createUser.loading) {
      if (!state?.createUser?.loading && !state.createUser.error) {
        successNotification(state.createUser.message);
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
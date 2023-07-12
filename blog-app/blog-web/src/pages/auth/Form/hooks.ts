import { useEffect } from "react";
import { useAuth } from "store/auth";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useHomeFormHook(): void {
  const auth = useAuth();
  const state = auth.state;
  const prevAuth = usePrevious(state);
  useEffect(() => {
    if (prevAuth?.signInState.loading) {
      if (!state?.signInState?.loading && !state.signInState.error) {
        successNotification(state.signInState.message);
      }
    }
    if (prevAuth?.signUpState.loading) {
      if (!state.signUpState.loading && !state.signUpState.error) {
       successNotification(state.signUpState.message);
     }
    }
  }, [state.signInState, state.signUpState]);
}
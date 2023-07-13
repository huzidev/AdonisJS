import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export default function useResetPasswordPageHooks(): void {
  const reset = useResetPassword();
  const state = reset.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();

    useEffect(() => {
    if (prev?.sendState.loading) {
      if (!state?.sendState?.loading && !state.sendState.error) {
        successNotification(state.sendState.message);
      }
    }
  }, [state]);
}

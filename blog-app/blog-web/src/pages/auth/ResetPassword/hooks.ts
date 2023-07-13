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
    if (prev?.resetState.loading) {
      if (!state?.sendState?.loading && !state.sendState.error) {
          successNotification(state.resetState.message);
        }
    }
    if (prev?.resendState.loading) {
      if (!state?.resendState?.loading && !state.resendState.error) {
        successNotification(state.resendState.message);
      }
    }
  }, [state]);
}
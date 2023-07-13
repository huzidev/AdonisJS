import ROUTE_PATHS from "Router/paths";
import qs from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "store/resetPassword";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export default function useResetPasswordPageHooks(email: any): void {
  const reset = useResetPassword();
  const state = reset.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();

    console.log("Email from hook", email);

    useEffect(() => {
    if (prev?.sendState.loading) {
      if (!state?.sendState?.loading && !state.sendState.error) {
        successNotification(state.sendState.message);
        navigate(ROUTE_PATHS.RESET_PASSWORD + "?" + qs.stringify(email))
      }
    }
  }, [state]);
}

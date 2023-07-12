import { useEffect } from "react";
import { useEmailVerification } from "store/emailVerification";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useVerifyPageHook(): void {
  const verify = useEmailVerification();
  const state = verify.state;
  const prevState = usePrevious(state);
  useEffect(() => {
    // calling Error Notification in redux action for resend verification code
    if (prevState?.verifyCode?.loading) {
      // if no error then show success message
      if (!state.verifyCode.loading && !state.verifyCode.error) {
        successNotification(state.verifyCode.message);
      }
    }
    if (prevState?.sendCode?.loading) {
      if (!state?.sendCode?.loading && !state.sendCode.error) {
        successNotification(state.sendCode.message);
      }
    }
  }, [state.verifyCode, state.sendCode]);
}
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useEmailVerification } from "store/emailVerification";
import { usePrevious } from "utils/hooks";

export function useVerifyPageHook(): void {
  const verify = useEmailVerification();
  const state = verify.state;
  const prevAuth = usePrevious(state);
  useEffect(() => {
    if (!state.verifyCode.loading && !state.verifyCode.error) {
      toast.success(state.verifyCode.message);
    }
    if (!prevAuth?.sendCode?.error && state.sendCode.error) {
      toast.error(state.sendCode.message);
    } else if (prevAuth?.sendCode?.loading && !state.sendCode.loading) {
      toast.success(state.sendCode.message);
    }
  }, [state.verifyCode, state.sendCode]);
}
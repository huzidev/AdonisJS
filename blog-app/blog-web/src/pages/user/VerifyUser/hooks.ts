import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useEmailVerification } from "store/emailVerification";
import { usePrevious } from "utils/hooks";

export function useVerifyPageHook(): void {
  const verify = useEmailVerification();
  const state = verify.state;
  const prevAuth = usePrevious(state);
  useEffect(() => {
    if (!prevAuth?.verifyCode?.error && state.verifyCode.error) {
      toast.error(state.verifyCode.message);
    } else if (prevAuth?.verifyCode?.loading && !state.verifyCode.loading) {
      toast.success(state.verifyCode.message);
    }
    if (!prevAuth?.sendCode?.error && state.sendCode.error) {
      toast.error('Failed to register');
    } else if (prevAuth?.sendCode?.loading && !state.sendCode.loading) {
      toast.success('User registered');
    }
  }, [state.verifyCode, state.sendCode]);
}
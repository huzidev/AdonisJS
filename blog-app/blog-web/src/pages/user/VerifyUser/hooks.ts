import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "store/auth";
import { usePrevious } from "utils/hooks";

export function useVerifyPageHook(): void {
  const auth = useAuth();
  const state = auth.state;
  const prevAuth = usePrevious(state);
  useEffect(() => {
    if (!prevAuth?.signInState?.error && state.signInState.error) {
      toast.error(state.signInState.message);
    } else if (prevAuth?.signInState?.loading && !state.signInState.loading) {
      toast.success("Success");
    }
    if (!prevAuth?.signUpState?.error && state.signUpState.error) {
      toast.error('Failed to register');
    } else if (prevAuth?.signUpState?.loading && !state.signUpState.loading) {
      toast.success('User registered');
    }
  }, [state.signInState, state.signUpState]);
}
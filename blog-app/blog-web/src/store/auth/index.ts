import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { AuthSignInPayload, AuthSignUpPayload, AuthState } from './types';

export function useAuth() {
  const state = useSelector((state: any) => state.auth) as AuthState;
  const dispatch = useAppDispatch();
  const initUser = () => dispatch(actions.initUser());
  const signIn = (payload: AuthSignInPayload) => dispatch(actions.signIn(payload));
  const signUp = (payload: AuthSignUpPayload) => dispatch(actions.signUp(payload));
  const signOut = () => dispatch(actions.signOut());

  return {
    state,
    initUser,
    signIn,
    signUp,
    signOut
  };
};
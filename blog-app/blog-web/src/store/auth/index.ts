import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { AuthSignInPayload, AuthSignUpPayload, AuthState, AuthVerificationPayload } from './types';

export function useAuth() {
  const state = useSelector((state: any) => state.auth) as AuthState;
  const dispatch = useAppDispatch();
  const initUser = () => dispatch(actions.initUser());
  const signOut = () => dispatch(actions.signOut());
  // to receive the data for signin and signup and use that data in redux therefore used payload
  const signIn = (payload: AuthSignInPayload) => dispatch(actions.signIn(payload));
  const signUp = (payload: AuthSignUpPayload) => dispatch(actions.signUp(payload));
  const sendCode = () => dispatch(actions.sendVerificationCode());
  const verifyCode = (payload: AuthVerificationPayload) => dispatch(actions.verifyVerificationCode(payload));
  // const updateuser = (payload: User) => dispatch(authSlice.actions.updateUser(payload));

  return {
    state,
    initUser,
    signIn,
    signUp,
    signOut,
    sendCode,
    verifyCode
  };
};
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { AuthSignInPayload, AuthSignUpPayload, AuthState } from './types';

export function useAuth() {
  const state = useSelector((state: any) => state.auth) as AuthState;
  const dispatch = useAppDispatch();
  const initUser = () => dispatch(actions.initUser());
  const signOut = () => dispatch(actions.signOut());
  // to receive the data for signin and signup and use that data in redux therefore used payload
  const signIn = (payload: AuthSignInPayload) => dispatch(actions.signIn(payload));
  const signUp = (payload: AuthSignUpPayload) => dispatch(actions.signUp(payload));
  // const updateuser = (payload: User) => dispatch(authSlice.actions.updateUser(payload));
  const sendCode = () => dispatch(actions.sendVerificationCode());
  const verifyCode = (payload: string) => dispatch(actions.verifyVerificationCode(payload));


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
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { ResetPasswordRequest, ResetPasswordSendCodeRequest, ResetPasswordState } from './types';

export function useResetPassword() {
  const state = useSelector((state: any) => state.reset) as ResetPasswordState;
  const dispatch = useAppDispatch();
  const sendResetPasswordCode = (payload: ResetPasswordSendCodeRequest) => dispatch(actions.sendResetPasswordCode(payload));
  const resetPassword = (payload: ResetPasswordRequest) => dispatch(actions.resetPassword(payload));

  return {
    state,
    sendResetPasswordCode,
    resetPassword
  };
};
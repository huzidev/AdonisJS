import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { ResetPasswordSendCodeRequest, ResetPasswordState } from './types';

export function useResetPassword() {
  const state = useSelector((state: any) => state.reset) as ResetPasswordState;
  const dispatch = useAppDispatch();
  const sendResetPasswordCode = (payload: ResetPasswordSendCodeRequest) => dispatch(actions.sendResetPasswordCode(payload));

  return {
    state,
    sendResetPasswordCode
  };
};
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from './actions';
import { EmailVerificationPayload, EmailVerificationState } from './types';


export function useEmailVerification() {
  const state = useSelector((state: any) => state.emailVerification) as EmailVerificationState;
  const dispatch = useAppDispatch();
  const sendCode = () => dispatch(actions.sendVerificationCode());
  const verifyCode = (payload: EmailVerificationPayload) => dispatch(actions.verifyVerificationCode(payload));

  return {
    state,
    sendCode,
    verifyCode
  };
};
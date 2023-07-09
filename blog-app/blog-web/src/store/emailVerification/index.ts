import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import { EmailVerificationState } from './types';

export function useEmailVerification() {
  const state = useSelector((state: any) => state) as EmailVerificationState;
  const dispatch = useAppDispatch();
  

  return {
    state,
   
  };
};
import { useSelector } from 'react-redux';
import { ResetPasswordState } from './types';

export function useResetPassword() {
  const state = useSelector((state: any) => state.reset) as ResetPasswordState;
 
  // const updateuser = (payload: User) => dispatch(authSlice.actions.updateUser(payload));


  return {
    state,
  
  };
};
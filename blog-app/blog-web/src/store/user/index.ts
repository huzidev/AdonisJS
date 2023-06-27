import { useSelector } from 'react-redux';
import { User } from 'store/auth/types';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { userSlice } from './reducer';
import { UserState, UserUpdatePayload } from './types';

export const useUser = () => {
  const state = useSelector((state: any) => state.user) as UserState;
  const dispatch = useAppDispatch();
  const updateUser = (payload: UserUpdatePayload) => dispatch(actions.updateById(payload)); 
  const updateUserState = (payload: User) => dispatch(userSlice.actions.updateUser(payload));

  return {
    state,
    updateUser,
    updateUserState
  }
}
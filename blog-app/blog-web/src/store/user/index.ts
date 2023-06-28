import { useSelector } from 'react-redux';
import { User } from 'store/auth/types';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { userSlice } from './reducer';
import { UserState, UserUpdatePayload } from './types';

export const useUser = () => {
  const state = useSelector((state: any) => state.user) as UserState;
  const dispatch = useAppDispatch();
  const allUser = () => dispatch(actions.allUser())
  const updateUser = (payload: UserUpdatePayload) => dispatch(actions.updateMe(payload)); 
  const getById = (payload: number) => dispatch(actions.getById(payload));
  const updateUserState = (payload: User) => dispatch(userSlice.actions.updateUser(payload));
  
  return {
    state,
    allUser,
    updateUser,
    updateUserState,
    getById
  }
}
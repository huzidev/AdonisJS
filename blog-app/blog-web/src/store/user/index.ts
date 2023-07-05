import { useSelector } from 'react-redux';
import { User } from 'store/auth/types';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { userSlice } from './reducer';
import { UpdateByIdPayload, UpdateMePayload, UserState } from './types';

export const useUser = () => {
  const state = useSelector((state: any) => state.user) as UserState;
  const dispatch = useAppDispatch();
  const allUser = () => dispatch(actions.allUser());
  const allUserPage = (payload: number) => dispatch(actions.allUserByPage(payload));
  const updateMe = (payload: UpdateMePayload) => dispatch(actions.updateMe(payload)); 
  const updateById = (payload: UpdateByIdPayload) => dispatch(actions.updateById(payload)); 
  const getById = (payload: number) => dispatch(actions.getById(payload));
  const updateUserState = (payload: User) => dispatch(userSlice.actions.updateUser(payload));
  const createUser = (payload: User) => dispatch(actions.createUser(payload));
  
  return {
    state,
    allUser,
    updateMe,
    updateUserState,
    getById,
    updateById,
    allUserPage,
    createUser
  }
}
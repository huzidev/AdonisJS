import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { UserState, UserUpdatePayload } from './types';

export const useUser = () => {
  const state = useSelector((state: any) => state.blogs) as UserState;
  const dispatch = useAppDispatch();
  const updateUser = (payload: UserUpdatePayload) => dispatch(actions.updateById(payload)); 

  return {
    state,
    updateUser
  }
}
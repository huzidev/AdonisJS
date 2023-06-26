import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import { UserState } from './types';

export const useBlogs = () => {
  const state = useSelector((state: any) => state.blogs) as UserState;
  const dispatch = useAppDispatch();


  return {
    state,
    
  }
}
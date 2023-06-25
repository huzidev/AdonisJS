import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { BlogState, getBlogPayload } from './types';

export const useBlogs = () => {
  const state = useSelector((state: any) => state.blogs) as BlogState;
  const dispatch = useAppDispatch();
  const getBlogs = () => dispatch(actions.getBlogs());
  const getBlog = (payload: getBlogPayload) => dispatch(actions.getBlog(payload));

  return {
    state,
    getBlogs,
    getBlog
  }
}
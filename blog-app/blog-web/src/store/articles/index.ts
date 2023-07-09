import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { AddBlogPayload, BlogState, GetBlogPayload, GetBlogsById, UpdateBlogPayload } from './types';

export const useBlogs = () => {
  const state = useSelector((state: any) => state.blogs) as BlogState;
  const dispatch = useAppDispatch();
  const getBlogs = (payload: number) => dispatch(actions.getBlogs(payload));
  const getBlogsById = (payload: GetBlogsById) => dispatch(actions.getBlogsById(payload));
  const getFavoriteBlogs = (payload: GetBlogsById) => dispatch(actions.getFavoriteBlogs(payload));
  const getBlog = (payload: GetBlogPayload) => dispatch(actions.getBlog(payload));
  const addBlog = (payload: AddBlogPayload) => dispatch(actions.addBlog(payload));
  const updateBlog = (payload: UpdateBlogPayload) => dispatch(actions.updateBlog(payload));
  const deleteBlog = (payload: number) => dispatch(actions.deleteBlog(payload));

  return {
    state,
    getBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogsById,
    getFavoriteBlogs
  }
}
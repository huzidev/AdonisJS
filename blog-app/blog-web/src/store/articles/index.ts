import { useSelector } from 'react-redux';
import { BlogList } from './types';

export const useBlogs = () => {
  const state = useSelector((state: any) => state.blogs) as BlogList;
  const allBlogsState = useSelector((state: any) => state.blogs.allBlogs);

  return {
    allBlogsState,
  }
}
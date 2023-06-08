import { useSelector } from 'react-redux';

export const useBlogs = () => {
  const state = useSelector((state: any) => state)
  const allBlogsState = useSelector((state: any) => state.blogs.allBlogs);

  return {
    allBlogsState,
  }
}
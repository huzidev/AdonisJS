import { useSelector } from 'react-redux';

export const useBlogs = () => {
  const allBlogsState = useSelector((state: any) => state.blogs.allBlogs);

  return {
    allBlogsState,
  }
}
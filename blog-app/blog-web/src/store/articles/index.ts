import { useSelector } from 'react-redux';

export const useAuth = () => {
  const allBlogsState = useSelector((state: any) => state.blogs.allBlogs);

  return {
    allBlogsState,
  };
};
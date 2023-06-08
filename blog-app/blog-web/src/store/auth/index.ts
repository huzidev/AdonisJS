import { useSelector } from 'react-redux';

export const useUser = () => {
  const userDetails = useSelector((state: any) => state.user.getUser);

  return {
    userDetails,
  };
};
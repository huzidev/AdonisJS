import { useEffect, useState } from "react";
import { useUser } from "store/user";

export function useShowBlogsHook() {
  const user = useUser();
  const [isViewProfile, setIsViewProfile] = useState<boolean>();
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (currentPath === '/blogs') {
      user.allUser()
    }
  }, [])

  useEffect(() => {
    currentPath.includes("user/view")
      ? setIsViewProfile(true)
      : setIsViewProfile(false);
  }, [currentPath]);

  return {
    isViewProfile,
    currentPath
  }
}

import { useEffect, useState } from "react";

export function useShowBlogsHook() {
  const [isViewProfile, setIsViewProfile] = useState<boolean>();
  const currentPath = window.location.pathname;

  useEffect(() => {
    currentPath.includes("user/view")
      ? setIsViewProfile(true)
      : setIsViewProfile(false);
  }, [currentPath]);

  return {
    isViewProfile
  }
}

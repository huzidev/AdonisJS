import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";

export function useViewBlogsHook() {
  const blogs = useBlogs();
  const params = useParams();
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

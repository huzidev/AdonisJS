import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";

export function useGetBlogPageHooks(): void {
  const params: any = useParams();
  const blog = useBlogs();
  const user = useUser();
  const state = blog.state;
  const prev = usePrevious(state);
  const ownerId: any = blog.state.getBlog.data?.ownerId;

  // seprately making with different useEffect because while creating in same useEffect as of ownerId it's fetching data multiple times
  useEffect(() => {
    blog.getBlog(params.slug);
  }, []);
  
  useEffect(() => {
    if (ownerId) {
      user.getById(ownerId);
    }
  }, [ownerId])
  
  useEffect(() => {
    if (prev?.getBlog.loading) {
      if (!state.getBlog.loading && !state.getBlog.error) {
        // if success then it'll show notification of success
        successNotification(state.getBlog.message);
      }
    }
  }, [state]);
}

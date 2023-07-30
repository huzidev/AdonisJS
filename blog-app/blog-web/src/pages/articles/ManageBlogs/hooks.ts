import qs from "query-string";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";
import { PayloadReq } from "./types";

export function useManageBlogsPageHooks(): void {
  const blogs = useBlogs();
  const auth = useAuth();
  const user = useUser();
  const params = useParams();
  const state = blogs.state;
  const prev = usePrevious(state);
  const isMe: any = auth.state.user;
  const isAdmin = hasPermission(
    "admin",
    auth.state.user?.role
  );
  const navigate = useNavigate();
  const payload: PayloadReq = {
    userId: isMe?.id,
    page: Number(params.page) || 1,
  };

  // no need for create !allUsers.data or !allUsers.length because new list of users will fetch every time when admin clicked on next buttton
  useEffect(() => {
    // qs.parse() is mandatory otherwise it'll send complete URL after ? which is ?sort=%7B"id"%3A"desc"%7D
    // but after using it through qs.parse(search) it'll send {sort: '{"id":"desc"}'} which is parsed value

    const search: any = qs.parse(window.location.search);
    if (isAdmin) {
      // params.page || 1 means if no params.page hence fetch first page if user clikced on next button then params.page will became 2 and now blogs according to 2nd page will fetch
      // so user's list will only fetched when admin is loggedIn so admin can see uploadedBy username
      user.allUser();
      blogs.getBlogsList({ page: params.page || 1, ...search });
    } else {
      blogs.getMyList({ payload, ...search });
    }
  }, [params.page, window.location.search]);

  useEffect(() => {
    if (prev?.getBlogsList.loading) {
      if (!state.getBlogsList.loading && !state.getBlogsList.error) {
        successNotification(state.getBlogsList.message);
      }
      // if user enter the page exceeding the page limit
      else if (!state.getBlogsList.loading && state.getBlogsList.error) {
        navigate("/");
      }
    }
  }, [state]);
}

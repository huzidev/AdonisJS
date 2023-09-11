import qs from "query-string";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { Blog } from "store/articles/types";
import { useAuth } from "store/auth";
import { useComment } from "store/comment";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";
import { userDetailsData } from "./data";
import { ParamsId, UserDetailState, ViewProfileStateHandler } from "./types";

export function useViewProfilePageHook(): ViewProfileStateHandler {
  const user = useUser();
  const auth = useAuth();
  const comment = useComment();
  const blogs = useBlogs();
  const reactions = useReactions();
  const params = useParams<ParamsId>();
  const userState = user.state;
  const blogState = blogs.state;
  const prevUser = usePrevious(userState);
  const prevBlog = usePrevious(blogState);
  const navigate = useNavigate();
  const username = userState.getUser.data?.username;
  const loggedInUser = auth.state.user?.username;
  const userDataById = user.state.getUser?.data;
  const isMe = params.id === "me";
  const userId = Number(params.id);
  const loggedInId: any = auth.state.user?.id;
  const isRole: any = userState.getUser.data?.role;
  const isLoggedInRole: any = auth.state.user?.role;
  const [userDetails, setUserDetails] =
    useState<UserDetailState>(userDetailsData);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const currentPage: number = blogState.getBlogsById.meta?.currentPage;
  const currentPageFvrt: number = blogState.getFavoriteBlogs.meta?.currentPage;
  const lastPageFvrt: number = blogState.getFavoriteBlogs.meta?.lastPage;
  const lastPage: number = blogState.getBlogsById.meta?.lastPage;

  const search: any = qs.parse(window.location.search);

  useEffect(() => {
    if (isMe) {
      user.getById(loggedInId);
    } else {
      user.getById(userId);
    }
    // since we've used useBlogsPageHooks() therefore getAllReactions() functions is created in that hook therefore no need to call that hook here
    // reactions.getAllReactions();
  }, [userId, loggedInId]);

  useEffect(() => {
    if (params.id === "me") {
      blogs.getBlogsById({ userId: loggedInId, page: 1, filters: search });
    } else {
      blogs.getBlogsById({ userId: userId, page: 1, filters: search });
    }
  }, [window.location.search, window.location.pathname]);

  useEffect(() => {
    if (prevUser?.getUser.loading) {
      if (!isMe) {
        setUserDetails({ ...userDetails, ...userDataById });
        const payloadData: any = {
          userId: userId,
          page: 1,
        };
        if (isRole === "user") {
          blogs.getFavoriteBlogs(payloadData);
        }
        // else {
        //   blogs.getBlogsById({ userId: userId, page: 1, filters: search });
        // // blogs.getBlogsById({ page: 1, ...search });
        // }
      }
      if (isMe) {
        // setUserDetails({ ...userDetails, ...auth.state.user });
        setUserDetails({ ...userDetails, ...userDataById });
        // because when user's role is user then we only wanted to fetch favoriteBlogs
        const payloadData: any = {
          userId: loggedInId,
          page: 1,
        };
        if (isLoggedInRole === "user") {
          blogs.getFavoriteBlogs(payloadData);
        }
        // else {
        //   blogs.getBlogsById({ userId: loggedInId, page: 1, filters: search });
        // // blogs.getBlogsById({ page: 1, ...search });
        // }
      }
    }

    if (prevBlog?.getBlogsById.loading) {
      setUserBlogs(blogState.getBlogsById.data);
    }
    if (prevBlog?.getFavoriteBlogs.loading) {
      setUserBlogs(blogState.getFavoriteBlogs.data);
    }

    if (prevUser?.getUser.loading) {
      if (!userState.getUser.loading && !userState.getUser.error) {
        // if user is banned then we won't show details fetched successfully notification
        if (username && !userState.getUser.data?.isBanned) {
          // check if clicked user's name (username) matches the loggedInUser name then call yours details fetched successfully
          successNotification(
            `${
              username === loggedInUser ? "Yours" : username
            }'s details fetched successfully`
          );
        }
      } // when user tries to change the URL example if user changes view/:id id of the user which doesn't exist then show error
      else if (!userState.getUser.loading && userState.getUser.error) {
        navigate('/');
      }
    }
    if (prevBlog?.deleteBlog.loading) {
      if (!blogState.deleteBlog.loading && !blogState.deleteBlog.error) {
        successNotification(blogState.deleteBlog.message);
      }
    }
    if (prevBlog?.getBlogsById.loading) {
      if (!blogState.getBlogsById.loading && !blogState.getBlogsById.error) {
        // created these two const variable here because in this statement these variable will be updated
        const currentPage = blogState.getBlogsById.meta.currentPage;
        const lastPage = blogState.getBlogsById.meta.lastPage;
        if (username) {
          successNotification(
            blogState.getBlogsById.message?.includes('No') 
            ? blogState.getBlogsById.message
            : (
              `${
                username === loggedInUser ? "Yours" : username
              }'s blogs page ${currentPage} of ${lastPage} fetched successfully`
            )
          );
        }
      }
    }
  }, [userState, blogState]);

  function loadMore() {
    const updatedPayload = {
      userId: isMe ? loggedInId : params.id,
      page: isRole === "user" ? currentPageFvrt + 1 : currentPage + 1,
    };
    if (isRole === "user") {
      blogs.getFavoriteBlogs(updatedPayload);
    } else {
      // filters: search so when user clicked on load more then result will be according to filters
      blogs.getBlogsById({...updatedPayload, filters: search});
    }
  }

  const allReactions: any = reactions.state.getAllReactions.data;
  const allComments: any = comment.state.getAllComments.data;

  return {
    userDetails,
    userBlogs,
    loadMore,
    currentPage,
    currentPageFvrt,
    lastPageFvrt,
    lastPage,
    isMe,
    isRole,
    allReactions,
    search,
    allComments
  };
}

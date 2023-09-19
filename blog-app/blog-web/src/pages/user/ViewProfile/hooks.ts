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
  const [isRole, setIsRole] = useState<any>('');
  // const isRole: any = userState.getUser.data?.role;
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
    if (!isMe) {
      user.getById(userId);
    }
    // since we've used useBlogsPageHooks() therefore getAllReactions() functions is created in that hook therefore no need to call that hook here
    // reactions.getAllReactions();
  }, [userId, loggedInId]);

  useEffect(() => {
    if (isRole) {
      setIsRole('');
    }
  }, [window.location.pathname])

  useEffect(() => {
    if (isMe) {
      setUserDetails({ ...userDetails, ...auth.state.user });
      if (isLoggedInRole === "user") {
        const payloadData: any = {
          userId: loggedInId,
          page: 1,
        };
        blogs.getFavoriteBlogs(payloadData);
        // fetching all users when loggedIn user's role is user so we can see all the username the user have liked on ViewProfile page
        user.allUser();
      } else {
        blogs.getBlogsById({ userId: loggedInId, page: 1, filters: search });
      }
    } else {
      if (isLoggedInRole === "user") {
        const payloadForLoggedIn: any = {
          // if clicked profile is of user then fetch
          userId: loggedInId,
        };
        blogs.getAllFavoriteBlogs(payloadForLoggedIn);
      }
    }
  }, [window.location.search, window.location.pathname]);

  // seprately creating condition for getBlogsById else if user clicked on user whose role is user then getBlogById was running which should not
  // because when clicked user's role is user then fetch favorite blogs list of that user
  useEffect(() => {
    if (isRole && isRole !== 'user') {
      blogs.getBlogsById({ userId: userId, page: 1, filters: search });
    }
  }, [window.location.search, isRole])
 
  console.log("isRole", isRole);

  useEffect(() => {
    if (prevUser?.getUser.loading) {
      // setIsRole is for checking conditions when user has clicked on user's profile whose role is not user then fetch blogsById of that user
      setIsRole(userState.getUser.data?.role);
      // not using isRole for checking isRole === user because when the clickedUser role is storing in isRole state the JS will run rest of that code and then isRole will be empty
      // therefore directly checking the role validation with userState.getUser.data?.role
      if (userState.getUser.data?.role === "user" && !isMe) {
        const payloadForClicked: any = {
          // if clicked profile is of user then fetch
          userId: userId,
          page: 1,
        };
        blogs.getFavoriteBlogs(payloadForClicked);
        // fetching all users when clicked user's role is user so we can see all the username the user have liked
        user.allUser();
      }
    } 
  }, [userState, window.location.search, isRole]);

  useEffect(() => {
    if (prevUser?.getUser.loading) {
      if (isMe) {
        setUserDetails({ ...userDetails, ...auth.state.user });
      } else {
        setUserDetails({ ...userDetails, ...userDataById });
      }
    }
    if (prevBlog?.getBlogsById.loading) {
      setUserBlogs(blogState.getBlogsById.data);
    }
    if (
      prevBlog?.getFavoriteBlogs.loading &&
      (isRole === "user" || isLoggedInRole === "user")
    ) {
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
        navigate("/");
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
            blogState.getBlogsById.message?.includes("No")
              ? blogState.getBlogsById.message
              : `${
                  username === loggedInUser ? "Yours" : username
                }'s blogs page ${currentPage} of ${lastPage} fetched successfully`
          );
        }
      }
    }
  }, [userState, blogState]);

  function loadMore() {
    const updatedPayload = {
      userId: isMe ? loggedInId : params.id,
      // isMe && isLoggedInRole === 'user' if user is on ViewProfile page and loggedIn user's role is user then put the next currentPageFvrt number
      page: (isRole === "user" || (isMe && isLoggedInRole === 'user')) ? currentPageFvrt + 1 : currentPage + 1,
    };
    // isMe && isLoggedInRole === 'user' if user is on viewProfilePage and loggedIn user's role is user then fetch the favoriteBlogs of that user
    if (isRole === "user" || (isMe && isLoggedInRole === 'user')) {
      blogs.getFavoriteBlogs(updatedPayload);
    } else {
      // filters: search so when user clicked on load more then result will be according to filters
      blogs.getBlogsById({ ...updatedPayload, filters: search });
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
    allComments,
  };
}

import ROUTE_PATHS from "Router/paths";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import { usePrevious } from "utils/hooks";
import { successNotification } from "utils/notifications";
import { altKeys, initialSortState, typeResult } from "./data";

export function useBlogsPageHooks() {
  const blogs = useBlogs();
  const user = useUser();
  const reactions = useReactions();
  const params: any = useParams();
  const auth = useAuth();
  const userId = Number(params.id);
  const loggedInId: any = auth.state.user?.id;
  const isMe = params.id === "me";
  const state = blogs.state;
  const prev = usePrevious(state);
  const navigate = useNavigate();
  const isUser = auth.state.user?.role === "user";
  const allUsers: any = user.state.allUser?.data;
  const isLoading = state.getBlogs.loading;
  const [sortValue, setSortValue] = useState(initialSortState);
  const payload: any = {
    userId: auth.state.user?.id,
    page: 1
  };

  const currentPageBlogs: any = blogs.state.getBlogs.meta?.currentPage;
  const currentPageFvrtBlogs: any =
    blogs.state.getFavoriteBlogs.meta?.currentPage;
  const lastPageFvrtBlogs: any = blogs.state.getFavoriteBlogs.meta?.lastPage;

  const currentPath: string = window.location.pathname.includes("/user/view") ? "onProfile" : "onBlogs";
  
  const search: any = qs.parse(window.location.search);

  useEffect(() => {
    // Get the sort parameter from the URL when the component mounts
    const searchParams = new URLSearchParams(window.location.search);
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      // If the sort parameter is present, update the sortValue state accordingly
      const sortValueObj = JSON.parse(sortParam);
      const key: any = Object.keys(sortValueObj)[0];
      const value: any = Object.values(sortValueObj)[0];
      setSortValue({ value: key, type: value });
    }
  }, []);

  function handleSort(column: string) {
    let type: any = '';
    
    // most recent will called desc because desc neans from last to first therefore the last belog will be the latest blog and type === "" when user called reset filters
    column === "most recent"
      ? (type = "recent")
      : column === "oldest"
      ? (type = "oldest")
      : column === "most popular"
      ? type = 'popular'
      : type = ''
    // becasuse most recent and old blog will be shown according to createdAt date and "" (empty string condition) is for when user clicked on reset filters
    // because then sortValue.value will be "" and we've statement in UI that only show resetFilters when sortValue.vlaue is not ""
    let update =
      altKeys.includes(column)
      ? "createdAt" 
      : column === "most popular"
      ? "blogs" : ''
    const result = typeResult.find((value) => value === type);

    // If the type is "asc", add the sort parameter to the URL
    if (type === result) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("sort", JSON.stringify({ [update]: type }));
      const newUrl = `${currentPath === "onBlogs" ? ROUTE_PATHS.ARTICLES : ROUTE_PATHS.VIEW_PROFILE}?${searchParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      // If the type is neither "asc" nor "desc", remove the entire "sort" parameter from the URL
      const newUrl = `${currentPath === "onBlogs" ? ROUTE_PATHS.ARTICLES : ROUTE_PATHS.VIEW_PROFILE}`;
      window.history.replaceState({}, "", newUrl);
    }
    setSortValue({ value: update, type });
  }
  
  function loadMore() {
    blogs.getBlogs({ page: currentPageBlogs + 1, ...search });
    if (isUser) {
      if (currentPageFvrtBlogs !== lastPageFvrtBlogs) {
        let loggedInId: any = auth.state.user?.id
        blogs.getFavoriteBlogs({
          page: currentPageFvrtBlogs + 1,
          userId: loggedInId
        });
      }
    }
  }

  useEffect(() => {
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allUsers) {
      user.allUser();
    }

    const payloadData = {
      userId: isMe ? loggedInId : userId,
      page: 1,
    };
    if (currentPath === "onBlogs") {
      blogs.getBlogs({ page: 1, ...search });
    } 
    // if (currentPath === "onProfile") {
    //   if (isMe) {
    //     blogs.getBlogsById({ ...payloadData, ...search });
    //   } 
    //   else {
    //     blogs.getBlogsById({ ...payloadData, ...search });
    //   }
    // }    
    reactions.getAllReactions();

    // so only if loggedIn user's role is user then fetch favorite blogs
    if (isUser) {
      blogs.getFavoriteBlogs(payload);
    }
  }, [window.location.search]);

  useEffect(() => {
    if (prev?.getBlogs.loading) {
      if (!state.getBlogs.loading && !state.getBlogs.error) {
        successNotification(state.getBlogs.message);
      } else if (!state.getBlogs.loading && state.getBlogs.error) {
        navigate(ROUTE_PATHS.ARTICLES);
        // so if any error occured then simply setSortValue to initial state which hides the reset filters button as well
        setSortValue(initialSortState);
      }
    }
    if (prev?.deleteBlog.loading) {
      if (!state.deleteBlog.loading && !state.deleteBlog.error) {
        successNotification(state.deleteBlog.message);
      }
    }
    if (prev?.addFavoriteBlog.loading) {
      if (!state.addFavoriteBlog.loading && !state.addFavoriteBlog.error) {
        successNotification(state.addFavoriteBlog.message);
      }
    }
    if (prev?.removeFavoriteBlog.loading) {
      if (!state.removeFavoriteBlog.loading && !state.removeFavoriteBlog.error) {
        successNotification(state.removeFavoriteBlog.message);
      }
    }
  }, [state]);

  const allReactions: any = reactions.state.getAllReactions.data;

  return {
    sortValue,
    loadMore,
    handleSort,
    isLoading,
    allReactions
  };
}

import ROUTE_PATHS from "Router/paths";
import { columns } from "pages/articles/Blogs/data";
import { useBlogsPageHooks } from "pages/articles/Blogs/hooks";
import ShowBlogs from "pages/articles/ShowBlogs/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { LoadingThreeDots, LoadingUser } from "utils/loading";
import { useViewProfilePageHook } from "./hooks";
import "./styles.css";

export default function ViewProfilePage(): JSX.Element {
  const auth = useAuth();
  const blogs = useBlogs();
  const user = useUser();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const currentRole = auth.state.user?.role;
  const isAdminRole = hasPermission("admin", currentRole);
  const blogState = blogs.state;
  const isUser = currentRole === "user";
  let totalBlogs = blogState.getBlogsById.meta?.total;
  let totalFvrtBlogs = blogState.getFavoriteBlogs.meta?.total;

  const isLoadingUser = user.state.getUser.loading;
  const isLoadingBlogs = blogState.getBlogsById.loading;
  const isLoadingFvrtBlogs = blogState.getFavoriteBlogs.loading;

  const {
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
  } = useViewProfilePageHook();

  const isAdmin = userDetails?.role === "admin";

  let isFilter;
  if (search.sort) {
    isFilter = Object.values(JSON.parse(search.sort))[0];
  }

  const { handleSort, sortValue } = useBlogsPageHooks();

  const totalBlogsContent =
    // !userBlogs.length so when user clicked on Load More then 3 Dot loader won't work because their is already data and same case is created for Load More button
    (isLoadingBlogs || isLoadingFvrtBlogs) && !userBlogs.length ? (
      <LoadingThreeDots />
    ) : userDetails?.role === "user" ? (
      totalFvrtBlogs
    ) : (
      totalBlogs
    );

  const formatedDate = new Date(userDetails.createdAt).toLocaleString();

  return (
    <div>
      <div
        className={`w-[1500px] my-5 mx-auto border bg-gray-800 rounded-lg shadow border-gray-700`}
      >
        <div className="p-5">
          {userDetails?.isBanned ? (
            <div className="flex pt-6">
              <p className="text-xl dark:text-white">
                User <b>{userDetails?.username}</b> Is Banned from this web
              </p>
            </div>
          ) : (
            <>
              <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-white">
                User Profile
              </h1>
              {isLoadingUser ? (
                <LoadingUser />
              ) : (
                <>
                  <h2 className="user-details">Id : {userDetails.id}</h2>
                  <h2 className="user-details">
                    Name : {userDetails.username + ` (${userDetails.role})`}
                  </h2>
                  <h2 className="user-details">Email : {userDetails.email}</h2>
                  <h2 className="user-details">Joined Date : {formatedDate}</h2>
                  <h2 className="user-details">
                    {(isUser && isMe) ||
                    user.state.getUser.data?.role === "user"
                      ? `Total Blogs Liked : `
                      : `Total Blogs : `}{" "}
                    {totalBlogsContent}
                  </h2>
                  {/* Current theme only be visible when user is on view profile page */}
                  {isMe && (
                    <h2 className="user-details">
                      Current Theme : {auth.state.isDark ? "Dark" : "light"}
                    </h2>
                  )}
                </>
              )}
            </>
          )}
          {/* userDetails?.role !== "super-admin" so admin can't see edit button on super-admin's profile and  can't edit super-admin details */}
          {!isLoadingUser &&
            (isMe ||
              (!isAdmin && currentRole === "super-admin") ||
              (isAdminRole && userDetails?.role !== "super-admin")) && (
              <Link
                to={
                  // if path paths doesn't have me then this means admin is on user view profile page hence send the admin to edit user by details
                  ROUTE_PATHS.EDIT_USER + `${isMe ? "me" : userDetails?.id}`
                }
                type="button"
                className="text-white bg-gray-800 font-medium text-sm py-2.5"
              >
                Edit
              </Link>
            )}
        </div>
      </div>
      <div className="w-[1500px] mx-auto">
        <h1 className="text-2xl font-bold tracking-tight dark:text-white">
          {/* if role is user then user can't upload the blogs hence show blogs Liked by you else if blogger loggedIn then show blogs Uploaded by You */}
          {/* isLoadingUser ? "" so when userState is in loading then don't show anything otherwise it'll show Blogs Uploaded while user state is in loading */}
          {isLoadingUser
            ? ''
            : (isUser && isMe) || isRole === "user"
            ? `Blogs Liked By ${isMe ? "You" : userDetails.username}`
            : `Blogs Uploaded By ${!isMe ? userDetails.username : "You"}`}
        </h1>
        <div>
          <ShowBlogs
            sortValue={sortValue}
            handleSort={handleSort}
            allBlogs={userBlogs}
            favoriteBlogs={userBlogs}
            columns={columns}
            isLoading={isLoadingUser}
            isLoadingBlogs={isLoadingBlogs}
            isLoadingFvrtBlogs={isLoadingFvrtBlogs}
            allReactions={allReactions}
            allComments={allComments}
            currentPageBlogs={currentPage}
            isRole={isRole}
            currentPageFvrt={currentPageFvrt}
            lastPageFvrt={lastPageFvrt}
            lastPageBlogs={lastPage}
            loadMore={loadMore}
            userDetails={userDetails}
            totalBlogs={totalBlogs}
            totalFvrtBlogs={totalFvrtBlogs}
            // userDetails={userDetails}
            isFilter={isFilter}
          />
        </div>
      </div>
    </div>
  );
}

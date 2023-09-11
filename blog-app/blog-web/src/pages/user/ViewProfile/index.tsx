import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { columns } from "pages/articles/Blogs/data";
import { useBlogsPageHooks } from "pages/articles/Blogs/hooks";
import ShowBlogs from "pages/articles/ShowBlogs/ShowBlogs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { LoaderSpin, LoadingListBlogs, LoadingThreeDots, LoadingUser } from "utils/loading";
import { useViewProfilePageHook } from "./hooks";
import './styles.css';

export default function ViewProfilePage(): JSX.Element {
  const auth = useAuth();
  const blogs = useBlogs();
  const user = useUser();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const userDataById = user.state.getUser?.data;
  const currentRole = auth.state.user?.role;
  const isAdminRole = hasPermission("admin", currentRole);
  const blogState = blogs.state;
  const isUser = currentRole === "user";
  const isAdmin = userDataById?.role === "admin";
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
    allComments
  } = useViewProfilePageHook();

  let isFilter;
  if (search.sort) {
    isFilter = Object.values(JSON.parse(search.sort))[0];
  }

  const { handleSort, sortValue } = useBlogsPageHooks();

  const totalBlogsContent =
    // !userBlogs.length so when user clicked on Load More then 3 Dot loader won't work because their is already data and same case is created for Load More button
    (isLoadingBlogs || isLoadingFvrtBlogs) && !userBlogs.length ? (
      <LoadingThreeDots />
    ) : userDataById?.role === "user" ? (
      totalFvrtBlogs
    ) : (
      totalBlogs
    );

  const formatedDate = new Date(userDetails.createdAt).toLocaleString();

  return (
      <div>
        <div className={`w-11/12 my-5 mx-auto border bg-gray-800 rounded-lg shadow border-gray-700`}>
          <div className="p-5">
            {userDataById?.isBanned ? (
              <div className="flex pt-6">
                <p className="text-xl dark:text-white">
                  User <b>{userDataById?.username}</b> Is Banned from this web
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
                    <h2 className="user-details">
                      Id : {userDetails.id}
                    </h2>
                    <h2 className="user-details">
                      Name : {userDetails.username + ` (${userDetails.role})`}
                    </h2>
                    <h2 className="user-details">
                      Email : {userDetails.email}
                    </h2>
                    <h2 className="user-details">
                      Joined Date : {formatedDate}
                    </h2>
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
                        Current Theme : {auth.state.isDark ? 'Dark' : 'light'}
                      </h2>
                    )}
                  </>
                )}
              </>
            )}
            {/* userDataById?.role !== "super-admin" so admin can't see edit button on super-admin's profile and  can't edit super-admin details */}
            {!isLoadingUser &&
              (isMe ||
                (!isAdmin && currentRole === "super-admin") ||
                (isAdminRole && userDataById?.role !== "super-admin")) && (
                <Link
                  to={
                    // if path paths doesn't have me then this means admin is on user view profile page hence send the admin to edit user by details
                    ROUTE_PATHS.EDIT_USER + `${isMe ? "me" : userDataById?.id}`
                  }
                  type="button"
                  className="text-white bg-gray-800 font-medium text-sm py-2.5"
                >
                  Edit
                </Link>
              )}
          </div>
        </div>
        <div className="w-11/12 mx-auto">
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
            userDataById={userDataById}
            totalBlogs={totalBlogs}
            totalFvrtBlogs={totalFvrtBlogs}
            userDetails={userDetails}
            isFilter={isFilter}
          />
        </div>
          {sortValue.value && (
            <button
              className="text-white mr-5  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              onClick={() => handleSort('')}
            >
              Reset Filters
            </button>
          )}
          {
          // so if allBlogs length is just 1 then no need to show filters
          // and filter won't be shown when someone clicked on user's profile because user can't add blogs
          (userBlogs.length >= 1 && userDataById?.role !== "user") && (
            <div>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                type="button"
                onClick={() => setDropDown(!dropDown)}
              >
                Filter List{" "}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${
                  dropDown
                    ? "block fixed divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
                    : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm  text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {columns.map((data, columnIndex) => (
                    // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                    <li
                      onClick={() => handleSort(data.title)}
                      className="px-5 py-3 cursor-pointer"
                      key={columnIndex}
                    >
                      {/* startCase will make the first letter Capital of any word */}
                      {startCase(data.title)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
        </div>
        <div className="w-11/12 mx-auto flex flex-wrap">
          {(isLoadingBlogs || isLoadingFvrtBlogs) && !userBlogs.length ? (
            <LoadingListBlogs />
          ) : (
            <>
              {userBlogs.map((blog: any) => {
                return (
                  <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
                    {/* <img src={ele.image} alt="Thumbnail" /> */}
                    <div className="h-52 border rounded-lg shadow bg-gray-800 border-gray-700">
                      <img
                        className="rounded-t-lg"
                        src="/docs/images/blog/image-1.jpg"
                        alt="Thumbnail"
                      />
                      <div>
                        <h5
                          title={blog.title}
                          className="mb-2 text-2xl font-bold tracking-tight text-white"
                        >
                          {blog.title.length > 21
                            ? `${blog.title.slice(0, 21)}...`
                            : blog.title}
                        </h5>
                        <p
                          title={blog.content}
                          className="mb-3 font-normal text-gray-400"
                        >
                          {blog.content.length > 50
                            ? `${blog.content.slice(0, 50)}...`
                            : blog.content}
                        </p>
                        <div className="flex justify-between">
                            <Link
                              to={ROUTE_PATHS.ARTICLE_VIEW + blog.slug}
                              className="text-sm font-medium text-center text-white hover:text-blue-500"
                            >
                              Read More
                            </Link>
                            <p className="text-white">
                              {/* to show Total likes of every blogs and ?? is used if totalCount is undefined means no like then show 0 */}
                              Likes : {allReactions && (allReactions.filter((value: any) => value.articleId === blog.id)[0]?.likeCount ?? "0")}
                            </p>
                          </div>
                        {(blog.ownerId === auth.state.user?.id ||
                          (!isAdmin && currentRole === "super-admin") ||
                          (isAdminRole &&
                            userDataById?.role !== "super-admin")) &&
                          // if user is banned then edit and delete button won't be shown just view profile button will show to update user details for admin and super-admin
                          !userDataById?.isBanned && (
                            <div>
                              <Link
                                to={ROUTE_PATHS.ARTICLE_UPDATE + blog.slug}
                                type="button"
                                className="button"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                className="button ml-4"
                                // onClick={() => blogs.deleteBlog(blog.id)}
                                onClick={() => {
                                  setDeleteBlogId(blog.id);
                                  setShowModal(true);
                                }}
                              >
                                Delete
                              </button>
                              {showModal && deleteBlogId === blog.id && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                                  <div className="bg-gray-900 text-white p-8 w-96">
                                    <p className="text-lg text-center mb-4">
                                      Are you sure you want to delete this blog?
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                      <button
                                        className="modal-buttons"
                                        onClick={() => {
                                          blogs.deleteBlog(blog.id);
                                          setShowModal(false);
                                        }}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        className="modal-buttons"
                                        onClick={() => setShowModal(false)}
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <p className="text-white">
                            Uploaded At :{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {(!isLoadingUser &&
                (!isLoadingBlogs && userBlogs.length === 0)) && (
                  <div className="w-full mt-5 py-8 pl-5 border rounded-lg shadow bg-gray-800 border-gray-700">
                    <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
                      Oops...
                      {/* if clickedUser role is user */}
                      {user.state.getUser.data?.role === "user" && !isMe
                        ? `${userDetails.username} haven't Liked`
                        : // if LoggedIn user's role is user and path includes "me"
                        isUser && isMe
                        ? "You haven't Liked"
                        : // if user role is not user and path includes "me" then show You haven't Uploaded any blog yet
                          `${
                            isMe ? "You" : userDetails.username
                          } haven't uploaded`}{" "}
                      any blog {!!isFilter && `related to ${isFilter} category`}
                    </h1>
                    <Link
                      to={
                        isMe && !isUser
                          ? ROUTE_PATHS.ARTICLE_CREATE
                          : ROUTE_PATHS.ARTICLES
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      title={isMe && !isUser ? "Add Blog" : "Explore Blogs"}
                    >
                      {/* if path includes "me" and loggedIn user role is not "user" then show add blog in brief if user role is not user then show add blog and if user clikced on someone else then show Explore Blogs */}
                      {isMe && !isUser ? "Add Blog" : "Explore Blogs"}
                    </Link>
                  </div>
                )}
              <div className="w-11/12 m-auto mt-5">
                {/* so load more button will only be visible when their is currentPage OR currentPageFvrt and if currentPage and lastPage values 
                became equal then don't show load more button anymore
                */}
                {
                  // totalBlogs and totalFvrtBlogs conditon so load more button won't be shown when user have total blogs length less than 15
                  (!isLoadingUser && (isRole === "user" ? currentPageFvrt !== lastPageFvrt : currentPage !== lastPage) &&
                    (isRole === "user" ? totalFvrtBlogs > 15 : totalBlogs > 15)) && (
                      <button
                        className="bg-blue-500 flex items-center justify-center hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={loadMore}
                      >
                        {/* so spinner with load more will only be shown when loading state is true and their is some data because if their is no data then load more will not be shown */}
                        Load More{" "}
                        {(isLoadingBlogs || isLoadingFvrtBlogs) &&
                          userBlogs.length && (
                            <LoaderSpin />
                          )}
                      </button>
                    )
                }
              </div>
            </>
          )}
        </div>
      </div>
  );
}

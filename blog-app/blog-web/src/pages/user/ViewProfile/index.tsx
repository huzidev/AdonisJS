import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { LoadingListBlogs, LoadingUser } from "utils/loading";
import { useViewProfilePageHook } from "./hooks";

export default function ViewProfilePage(): JSX.Element {
  const auth = useAuth();
  const blogs = useBlogs();
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const userDataById = user.state.getUser?.data;
  const currentRole = auth.state.user?.role;
  const isAdminRole = hasPermission("admin", currentRole);
  const isUser = currentRole === "user";
  const isAdmin = userDataById?.role === "admin";
  const blogState = blogs.state;
  // let userBlogs = isUser ? blogs.state.getFavoriteBlogs?.data : allBlogsById.filter((blogs) => blogs.ownerId === currentId);
  let totalBlogs = blogs.state.getBlogsById.meta?.total;
  let totalFvrtBlogs = blogs.state.getFavoriteBlogs.meta?.total;

  const isLoadingUser = user.state.getUser.loading;
  const isLoadingBlogs = blogs.state.getBlogsById.loading;
  const isLoadingFvrtBlogs = blogs.state.getFavoriteBlogs.loading;

  const totalBlogsContent = isLoadingBlogs || isLoadingFvrtBlogs ? (
  <ThreeDots
    height="35"
    width="50"
    radius="9"
    color="#4fa94d"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
) : (
  userDataById?.role === "user" ? totalFvrtBlogs : totalBlogs
);

  const {
    userDetails,
    userBlogs,
    loadMore,
    currentPage,
    currentPageFvrt,
    lastPageFvrt,
    lastPage,
    isMe,
  } = useViewProfilePageHook();
  const formatedDate = new Date(userDetails.createdAt).toLocaleString();
  return (
    <>
      <div>
        <div className="w-11/12 my-5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            {userDataById?.isBanned ? (
              <div className="flex pt-6">
                <p className="text-xl">
                  User <b>{userDataById?.username}</b> Is Banned from this web
                </p>
              </div>
            ) : (
              <>
                <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  User Profile
                </h1>
                {isLoadingUser ? (
                  <LoadingUser />
                ) : (
                  <>
                    <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Id : {userDetails.id}
                    </h2>
                    <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Name : {userDetails.username + ` (${userDetails.role})`}
                    </h2>
                    <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Email : {userDetails.email}
                    </h2>
                    <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Joined Date : {formatedDate}
                    </h2>
                    <h2 className="mb-4 text-xl flex font-bold tracking-tight text-gray-900 dark:text-white">
                      {(isUser && isMe) ||
                      user.state.getUser.data?.role === "user"
                        ? `Total Blogs Liked : `
                        : `Total Blogs : `} {totalBlogsContent}
                    </h2>
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
          <h1 className="text-2xl font-bold tracking-tight">
            {/* if role is user then user can't upload the blogs hence show blogs Liked by you else if blogger loggedIn then show blogs Uploaded by You */}
            {(isUser && isMe) || user.state.getUser.data?.role === "user"
              ? `Blogs Liked By ${isMe ? "You" : userDetails.username}`
              : `Blogs Uploaded By ${!isMe ? userDetails.username : "You"}`}
          </h1>
        </div>
        <div className="w-11/12 mx-auto flex flex-wrap">
          {
            isLoadingBlogs ? (
              <LoadingListBlogs />
            ) : (
              userBlogs.map((blog: any) => {
                return (
                  <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
                    {/* <img src={ele.image} alt="Thumbnail" /> */}
                    <div className="h-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <img
                        className="rounded-t-lg"
                        src="/docs/images/blog/image-1.jpg"
                        alt="Thumbnail"
                      />
                      <div>
                        <h5
                          title={blog.title}
                          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                          {blog.title.length > 21
                            ? `${blog.title.slice(0, 21)}...`
                            : blog.title}
                        </h5>
                        <p
                          title={blog.content}
                          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                        >
                          {blog.content.length > 50
                            ? `${blog.content.slice(0, 50)}...`
                            : blog.content}
                        </p>
                        <Link
                          to={ROUTE_PATHS.ARTICLE_VIEW + blog.slug}
                          className="text-sm font-medium text-center text-white hover:text-blue-500"
                        >
                          Read More
                        </Link>
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
                                className="text-white bg-gray-800 font-medium text-sm py-2.5"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                className="text-white bg-gray-800 font-medium text-sm ml-4 py-2.5"
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
                                  <div className="bg-white p-8 w-96">
                                    <p className="text-lg text-center mb-4">
                                      Are you sure you want to delete this blog?
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                      <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => {
                                          blogs.deleteBlog(blog.id);
                                          setShowModal(false);
                                        }}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
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
                      </div>
                    </div>
                  </div>
                );
              }
            )
            )
            // (favoriteBlogs.data && userBlogs)
            // // ? favoriteBlogs.data.map((blog: any) => {
            // ? userBlogs.map((blog: any) => {
            //     return (
            //       <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
            //         {/* <img src={ele.image} alt="Thumbnail" /> */}
            //         <div className="h-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            //           <img
            //             className="rounded-t-lg"
            //             src="/docs/images/blog/image-1.jpg"
            //             alt="Thumbnail"
            //           />
            //           <div className="p-5">
            //             <h5
            //               title={blog.title}
            //               className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            //             >
            //               {blog.title.length > 21
            //                 ? `${blog.title.slice(0, 21)}...`
            //                 : blog.title}
            //             </h5>
            //             <p
            //               title={blog.content}
            //               className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            //             >
            //               {blog.content.length > 50
            //                 ? `${blog.content.slice(0, 50)}...`
            //                 : blog.content}
            //             </p>
            //             <Link
            //               to={ROUTE_PATHS.ARTICLE_VIEW + blog.slug}
            //               className="text-sm font-medium text-center text-white hover:text-blue-500"
            //             >
            //               Read More
            //             </Link>
            //           </div>
            //         </div>
            //       </div>
            //     );
            //     // so when user reload the page this won't be shown for the time page is reloading
            //     // when user clicked on viewProfile then if userBlogs OR favoriteBlogs is empty then show field otherwise show the blogs Uploaded or Liked by that user
            //     // that condiiton for shwowing is defined above
            //   })
            // :
          }
          {(!isLoadingUser && (isLoadingBlogs || isLoadingFvrtBlogs) && userBlogs.length === 0) && (
            <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                any blog yet
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
        </div>
      </div>
      <div className="w-11/12 m-auto mt-5">
        {/* so load more button will only be visible when their is currentPage OR currentPageFvrt and if currentPage and lastPage values 
         became equal then don't show load more button anymore
        */}
        {
          // totalBlogs and totalFvrtBlogs conditon so load more button won't be shown when user have total blogs length less than 15
          (currentPageFvrt !== lastPageFvrt || currentPage !== lastPage) &&
            (totalBlogs > 15 || totalFvrtBlogs > 15) && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={loadMore}
              >
                Load More
              </button>
            )
        }
      </div>
    </>
  );
}

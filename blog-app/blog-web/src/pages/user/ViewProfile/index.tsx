import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { usePrevious } from "utils/hooks";
import { userDetailsData } from "./data";
import { useViewProfilePageHook } from "./hooks";
import { UserDetailState } from "./types";

export default function ViewProfilePage(): JSX.Element {
  const auth = useAuth();
  const blogs = useBlogs();
  const user = useUser();
  const params: any = useParams();
  const data = auth.state.user;
  const userDataById = user.state.getUser?.data;
  const currentPage: any = blogs.state.getBlogsById.meta?.currentPage;
  const lastPage: any = blogs.state.getBlogsById.meta?.lastPage;
  const currentRole = auth.state.user?.role;
  const isUser = currentRole === "user";
  const isAdmin = hasPermission("admin", currentRole);
  const isMe = params.id === "me";
  const userState = user.state;
  const blogState = blogs.state;
  const prevBlog = usePrevious(blogState);
  const prev = usePrevious(userState);
  // const [payload, setPayload] = useState<any>({
  //   userId: isMe ? auth.state.user?.id : Number(params.id),
  //   page: 1,
  // });
  const [payload, setPayload] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  let isClickedUser: any;
  const [userDetails, setUserDetails] =
    useState<UserDetailState>(userDetailsData);
  const formatedDate = new Date(userDetails.createdAt).toLocaleString();
  const userId: any = auth.state.user?.id;

  let currentId = isMe ? userId : Number(params.id);
  let allBlogsById = blogs.state.getBlogsById.data;
  // let userBlogs = isUser ? blogs.state.getFavoriteBlogs?.data : allBlogsById.filter((blogs) => blogs.ownerId === currentId);
  let totalBlogs = blogs.state.getBlogsById.meta?.total;
  let favoriteBlogs = blogs.state.getFavoriteBlogs;
  const [userBlogs, setUserBlogs] = useState<any>();

  const loggedInId: any = auth.state.user?.id;

  useEffect(() => {
    if (isMe) {
      user.getById(loggedInId);
    } else {
      user.getById(params.id);
    }
  }, [params.id, loggedInId])
  
  const isRole: any = userState.getUser.data?.role;
  useEffect(() => {
    if (prev?.getUser.loading) {
      if (!isMe) {
      setUserDetails({...userDetails, ...userDataById});
        if (isRole === "user") { 
          blogs.getFavoriteBlogs({
            userId: params.id,
            page: 1
          });
        } else {
          blogs.getBlogsById({
            userId: params.id,
            page: 1
          });
        }
      } 
      if (isMe) {
      setUserDetails({...userDetails, ...data});
        // because when user's role is user then we only wanted to fetch favoriteBlogs
        const payloadData = {
            userId: loggedInId,
            page: 1
          }
        if (isRole === "user") {
          blogs.getFavoriteBlogs(payloadData);
        } else {
          blogs.getBlogsById(payloadData);
        }
      }
    }
  }, [userState])


  useEffect(() => {
    if (prevBlog?.getBlogsById.loading) {
      console.log("blogs by id", blogState.getBlogsById.data);
      setUserBlogs(blogState.getBlogsById.data)
    } 
    if (prevBlog?.getFavoriteBlogs.loading) {
      console.log("favortite blogs by id", blogState.getFavoriteBlogs.data);
      setUserBlogs(blogState.getFavoriteBlogs.data)
    }
  }, [blogState])

  function loadMore() {
    const updatedPayload = {
      ...payload,
      page: currentPage + 1,
    };
    setPayload(updatedPayload);
    blogs.getBlogsById(updatedPayload);
  }

  useViewProfilePageHook();
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
                <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {(isUser && isMe) || user.state.getUser.data?.role === "user"
                    ? `Total Blogs Liked : ${favoriteBlogs.meta?.total}`
                    : `Total Blogs : ${totalBlogs}`}
                </h2>
              </>
            )}
            {/* userDataById?.role !== "super-admin" so admin can't see edit button on super-admin's profile */}
            {(isMe || isAdmin) && userDataById?.role !== "super-admin" && (
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
          {userBlogs && userBlogs.length
            ? userBlogs.map((blog: any) => {
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
                        {(blog.ownerId === userDataById?.id ||
                          (hasPermission("admin", userDataById?.role) &&
                            userDataById?.role !== "super-admin") ||
                          hasPermission("super-admin", userDataById?.role)) &&
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
              })
            : favoriteBlogs.data.length
            ? favoriteBlogs.data.map((blog: any) => {
                return (
                  <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
                    {/* <img src={ele.image} alt="Thumbnail" /> */}
                    <div className="h-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <img
                        className="rounded-t-lg"
                        src="/docs/images/blog/image-1.jpg"
                        alt="Thumbnail"
                      />
                      <div className="p-5">
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
                      </div>
                    </div>
                  </div>
                );
                // so when user reload the page this won't be shown for the time page is reloading
                // when user clicked on viewProfile then if userBlogs OR favoriteBlogs is empty then show field otherwise show the blogs Uploaded or Liked by that user
                // that condiiton for shwowing is defined above
              })
            : !blogs.state.getBlogs?.loading &&
              (!userBlogs.length || !favoriteBlogs.data) && (
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
        {currentPage !== lastPage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}

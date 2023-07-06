import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { UserDetailState } from "./types";

export default function ViewProfilePage() {
  const auth = useAuth();
  const blogs = useBlogs();
  const user = useUser();
  const params: any = useParams();
  const data = auth.state.user;
  const userDataById = user.state.getUser?.data;
  const currentPage: any = blogs.state.getBlogsById.meta?.currentPage;
  const lastPage: any = blogs.state.getBlogsById.meta?.lastPage;
  const isUser = auth.state.user?.role === "user";
  const isClickedUser = user.state.getUser.data?.role === "user";
  const isMe = params.id === "me";
  const [payload, setPayload] = useState<any>({
    userId: isMe ? Number(auth.state.user?.id) : Number(params.id),
    page: 1,
  });
  const [userDetails, setUserDetails] = useState<UserDetailState>({
    username: "",
    email: "",
    createdAt: "",
    role: "",
  });
  const formatedDate = new Date(userDetails.createdAt).toLocaleString();
  const userId: any = auth.state.user?.id;

  let currentId = isMe ? userId : Number(params.id);
  let allBlogsById = blogs.state.getBlogsById.data;
  let userBlogs = allBlogsById.filter((blogs) => blogs.ownerId === currentId);
  let totalBlogs = blogs.state.getBlogsById.meta?.total;

  useEffect(() => {
    if (params.id !== "me" && Number(params.id) !== userDataById?.id) {
      user.getById(params.id);
      blogs.getBlogsById(payload);
    } else if (isMe && !userBlogs.length) {
      blogs.getBlogsById(payload);
    }
  }, [params.id, currentId]);

  // to store the data
  useEffect(() => {
    if (params.id !== "me" && userDataById) {
      setUserDetails({ ...userDetails, ...userDataById });
    } else if (isMe && data) {
      setUserDetails({ ...userDetails, ...data });
    }
  }, [userDataById, params.id]);

  function loadMore() {
    const updatedPayload = {
      ...payload,
      page: currentPage + 1,
    };
    setPayload(updatedPayload);
    blogs.getBlogsById(updatedPayload);
  }

  console.log("users blogs", userBlogs);
  console.log("IsClicked User", isClickedUser);

  return (
    <>
      <div>
        <div className="w-11/12 my-5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              User Profile
            </h1>
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
              {(isUser && isMe) || isClickedUser
                ? "Total Blogs Liked :"
                : `Total Blogs : ${totalBlogs}`}
            </h2>
            {isMe && (
              <Link
                to={ROUTE_PATHS.EDIT_USER + "me"}
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
            {(isUser && isMe) || isClickedUser
              ? `Blogs Liked By ${isMe ? "You" : userDetails.username}`
              : `Blogs Uploaded By ${!isMe ? userDetails.username : "You"}`}
          </h1>
        </div>
        <div className="w-11/12 mx-auto flex flex-wrap">
          {userBlogs.length
            ? userBlogs.map((blog: any) => {
                return (
                  <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
                    <p></p>
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
                        {blog.ownerId === userId && (
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
                              onClick={() => blogs.deleteBlog(blog.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : // so when user reload the page this won't be shown for the time page is reloading
              !blogs.state.getBlogs?.loading && (
                <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
                    Oops...
                    {/* if clickedUser role is user */}
                    {isClickedUser && !isMe
                      ? `${userDetails.username} haven't Liked`
                      // if LoggedIn user's role is user and path includes "me"
                      : (isUser && isMe)
                      ? "You haven't Liked"
                      // if user role is not user and path includes "me" then show You haven't Uploaded any blog yet
                      : `${isMe ? "You" : userDetails.username} haven't Uploaded`} any blog yet
                  </h1>
                  <Link
                    to={
                      isUser && isMe
                        ? ROUTE_PATHS.ARTICLES
                        : ROUTE_PATHS.ARTICLE_CREATE
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    title="Add Blogs"
                  >
                    {isUser && isMe ? "Explore Blogs" : "Add Blog"}
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

import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { useBlogsPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogsPage(): JSX.Element {
  const blogs = useBlogs();
  const auth = useAuth();
  const user = useUser();
  const allUsers = user.state.allUser?.data;
  const favoriteBlogs = blogs.state.getFavoriteBlogs?.data;
  const allBlogs = blogs.state.getBlogs?.data;
  const userData = auth.state.user;
  const [showModal, setShowModal] = useState(false);
  // to hold delete blog id as we can't directly called the modal in map
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);

  const currentPageBlogs: any = blogs.state.getBlogs.meta?.currentPage;
  const currentPageFvrtBlogs: any =
    blogs.state.getFavoriteBlogs.meta?.currentPage;
  const lastPageBlogs: any = blogs.state.getBlogs.meta?.lastPage;
  const lastPageFvrtBlogs: any = blogs.state.getFavoriteBlogs.meta?.lastPage;

  function loadMore() {
    blogs.getBlogs(currentPageBlogs + 1);
    if (currentPageFvrtBlogs !== lastPageFvrtBlogs) {
      blogs.getFavoriteBlogs(currentPageFvrtBlogs + 1);
    }
  }

  useBlogsPageHooks();
  return (
    <>
      <div className="w-10/12 m-auto flex flex-wrap">
        {allBlogs.map((blog: BlogState) => {
          // allUsers? is mandatory as it can be empty
          const uploadedByUser = allUsers?.find(
            (user: User) => user.id === blog.ownerId
          );
          const isBannedUser: any = uploadedByUser && uploadedByUser.isBanned;
          const uploadedByUserRole = uploadedByUser && uploadedByUser.role;
          const uploadedByUserId = uploadedByUser && uploadedByUser.id;
          const uploadedByUsername = uploadedByUser && uploadedByUser.username;
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
                  <div className="flex justify-between">
                    <h5
                      title={blog.title}
                      className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                      {blog.title.length > 21
                        ? `${blog.title.slice(0, 21)}...`
                        : blog.title}
                    </h5>
                    {
                      // only if loggedIn user's role is user then show heart icon for adding blogs in favorite
                      auth.state.user && auth.state.user.role === "user" && (
                        <div
                          className={`p-2 rounded-full transition-colors duration-300 ${
                            favoriteBlogs.find(
                              (favoriteBlog) => favoriteBlog.id === blog.id
                            )
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                          onClick={() =>
                            favoriteBlogs.find(
                              (favoriteBlog) => favoriteBlog.id === blog.id
                            )
                              ? blogs.removeFavoriteBlog(blog.id)
                              : blogs.addFavoriteBlog({
                                  userId: auth.state.user?.id,
                                  articleId: blog.id,
                                })
                          }
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {favoriteBlogs.find(
                              (favoriteBlog) => favoriteBlog.id === blog.id
                            ) ? (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.725 5.275a5.5 5.5 0 1 0-7.778 0L10 6.293l-.947-.948a5.5 5.5 0 1 0-7.778 7.778l.947.947L10 18.243l6.725-6.725.947-.947a5.5 5.5 0 0 0 0-7.778z"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.725 5.275a5.5 5.5 0 1 0-7.778 0L10 6.293l-.947-.948a5.5 5.5 0 1 0-7.778 7.778l.947.947L10 18.243l6.725-6.725.947-.947a5.5 5.5 0 0 0 0-7.778l-.947-.947z"
                              />
                            )}
                          </svg>
                        </div>
                      )
                    }
                  </div>
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
                    {/* {blog.createdAt} */}
                  </Link>
                  {/* Only if ownerId of blog matches loggedIn user id OR admin and super-admin can Edit and Delete AND if loggedIn user is admin then admin Can't update or delte blog by super-admin */}
                  {(blog.ownerId === userData?.id ||
                    (hasPermission("admin", userData?.role) &&
                      uploadedByUserRole !== "super-admin") ||
                    hasPermission("super-admin", userData?.role)) && (
                      userData?.isBanned ? (
                        <div>
                          View Profile
                        </div>
                      ) : (
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
                      )
                  )}
                  <div className="flex justify-end items-center">
                    <p className="text-white">Uploaded By :&nbsp;</p>
                    {isBannedUser ? (
                      <del title="Banned User" className="text-red-600">{uploadedByUsername}</del>
                    ) : (
                      <Link
                        to={
                          blog.ownerId === auth.state.user?.id
                            ? ROUTE_PATHS.VIEW_PROFILE + "me"
                            : ROUTE_PATHS.VIEW_PROFILE + uploadedByUserId
                        }
                        type="button"
                        className="text-sm font-medium text-center text-white hover:text-blue-500"
                      >
                        {uploadedByUsername}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* if both currentPage is = to lastPage means final page hence no more fetching after that */}
      </div>
      <div className="w-10/12 m-auto mt-5">
        {currentPageBlogs !== lastPageBlogs && (
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

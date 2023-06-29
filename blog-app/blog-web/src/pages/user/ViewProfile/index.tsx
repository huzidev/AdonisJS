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

  const [userDetails, setUserDetails] = useState<UserDetailState>({
    username: "",
    email: "",
    createdAt: "",
  });
  const formatedDate = new Date(userDetails.createdAt).toLocaleString();
  const userId = auth.state.user?.id;

  const userDataById = user.state.getUser?.data;

  // if user changes URL from user/view/:id to user/view/me
  useEffect(() => {
    if (params.id !== "me") {
      user.getById(params.id);
    }
    setUserDetails({ ...userDetails, ...data });
    // if their is already blogs fetched means they were saved in our redux state hence no need to fetched the blogs again
    if (!allBlogs.length) {
      blogs.getBlogs(1)
    }
  }, [params.id]);

  // to store the data
  useEffect(() => {
    if (params.id !== "me" && userDataById) {
      setUserDetails({ ...userDetails, ...userDataById });
    }
  }, [userDataById]);

  let currentId = params.id === "me" ? userId : Number(params.id);

  let allBlogs = blogs.state.getBlogs?.data;
  let userBlogs = allBlogs.filter((blogs) => blogs.ownerId === currentId);

  return (
    <div>
      <div className="w-11/12 my-5 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            User Profile
          </h1>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Name : {userDetails.username}
          </h2>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Email : {userDetails.email}
          </h2>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Joined Date : {formatedDate}
          </h2>
          <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Blogs : {userBlogs.length}
          </h2>
          {params.id === "me" && (
            <Link
              to={ROUTE_PATHS.EDIT_PROFILE}
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
          Blogs Uploaded By { params.id !== "me" ? userDetails.username : "You" }
        </h1>
      </div>
      <div className="w-11/12 mx-auto flex flex-wrap">
        {userBlogs.length
          ? userBlogs.map((blog: any) => {
              return (
                <div key={blog.id} className="w-[30.33%] mt-8 mx-4">
                  <p>
                  </p>
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
            // so when user reload the page this won't be shown for the time page is reloading
          : !blogs.state.getBlogs?.loading && (
            <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
                Oops... You haven't uploaded any blog yet
              </h1>
                <Link
                to={ROUTE_PATHS.ARTICLE_CREATE}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                title="Add Blogs">
                  Add Blogs
                </Link>
            </div>
          )}
      </div>
    </div>
  );
}

import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useUser } from "store/user";
import { useGetBlogPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogPage(): JSX.Element {
  const user = useUser();
  const blog = useBlogs();
  const getBlog = blog.state.getBlog?.data;
  const owner = user.state.getUser.data;
  const initialState: BlogState = { title: "", image: "", content: "" };
  const [blogView, setBlogView] = useState(initialState);

  useEffect(() => {
    setBlogView({ ...blogView, ...getBlog });
  }, [getBlog]);

  useGetBlogPageHooks();

  return (
    <div>
      <div className="w-2/3 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {owner?.isBanned ? (
          <div>
            User {owner?.username} Is Banned from this web
          </div>
        ) : (
          <>
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt="Thumbnail"
            />
            <div className="p-5 flex flex-col items-center">
              <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blogView.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blogView.content}
              </p>
            </div>
            <div className="flex justify-end mr-3">
              <Link to={ROUTE_PATHS.VIEW_PROFILE + owner?.id}>
                Uploaded By : {owner?.username}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

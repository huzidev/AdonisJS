import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import CommentsPage from "../comments/ShowComments";
import { useGetBlogPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogPage(): JSX.Element {
  const user = useUser();
  const auth = useAuth();
  const loggedInId: any = auth.state.user?.id;
  const reaction = useReactions();
  const blog = useBlogs();
  const getBlog: any = blog.state.getBlog?.data;
  const owner = user.state.getUser.data;
  const initialState: BlogState = { title: "", image: "", content: "" };
  const [blogView, setBlogView] = useState(initialState);
  const ownerId: any = blog.state.getBlog.data?.ownerId
  const allReactions: any = reaction.state.getReactions.data;

  useEffect(() => {
    setBlogView({ ...blogView, ...getBlog });
  }, [getBlog]);

  useGetBlogPageHooks();
  return (
    <div>
      <div className="w-2/3 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {owner?.isBanned ? (
          <div className="flex justify-center py-32">
            <p className="text-xl">
              User <b>{owner?.username}</b> Is Banned from this web
            </p>
          </div>
        ) : (
          <>
            <img
              className="rounded-t-lg"
              src="/docs/images/blog/image-1.jpg"
              alt="Thumbnail"
            />
              <button onClick={() => reaction.addReaction({
                userId: loggedInId,
                articleId: getBlog?.id,
                isLike: true,
                isDislike: false
              })}>
                  Like
              </button>
              <button className="ml-5" onClick={() => reaction.addReaction({
                userId: loggedInId,
                articleId: getBlog?.id,
                isLike: false,
                isDislike: true
              })}>
                Dislike
              </button>
            <div className="p-5 flex flex-col items-center">
              <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blogView.title} {blog.state.getBlog.data?.id}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blogView.content}
              </p>
            </div>
            <div className="flex justify-between mr-3">
              <div className="flex">
                <p>
                  Likes : {allReactions && allReactions.totalLikes}
                </p>
                <p className="ml-2">
                  Dislikes : {allReactions && allReactions.totalDislikes}
                </p>
              </div>
              <Link to={ROUTE_PATHS.VIEW_PROFILE + owner?.id}>
                Uploaded By : {owner?.username}
              </Link>
            </div>
          </>
        )}
      </div>
        <div className="w-2/3 my-8 mx-auto">
          <CommentsPage 
            ownerId={ownerId}
          />
        </div>
    </div>
  );
}

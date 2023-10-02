import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import "utils/responsive.css";
import CommentsPage from "../comments/AddComment";
import { useGetBlogPageHooks } from "./hooks";
import { AddReactionState, BlogState } from "./types";

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
  const allReactions: any = reaction.state.getReactions.data;
  const ownerId: any = blog.state.getBlog.data?.ownerId;
  const reactState: AddReactionState = {
    userId: loggedInId,
    articleId: getBlog?.id,
  };
  // to check that allReactions must not be null and allReactions.user must also not be null otherwise it'll show error if we just check allReactions
  const allReactionsState = allReactions && allReactions.user;

  useEffect(() => {
    setBlogView({ ...blogView, ...getBlog });
  }, [getBlog]);

  useGetBlogPageHooks();

  return (
    <div className="responsive mx-auto">
      <div className="my-8 border rounded-lg shadow bg-gray-800 border-gray-700">
        {owner?.isBanned ? (
          <div className="flex justify-center py-32">
            <p className="text-xl dark:text-white">
              User{" "}
              <Link to={ROUTE_PATHS.VIEW_PROFILE + ownerId}>
                <b>{owner?.username}</b>
              </Link>{" "}
              Is Banned from this web
            </p>
          </div>
        ) : (
          <>
            <img
              className="rounded-t-lg h-1/3 w-full"
              src={require(`assets/astronomy.jpg`)}
              alt="Thumbnail"
            />
            {auth.state.user && (
              <div className="text-white flex relative">
                <div>
                  <button
                    onClick={() =>
                      reaction.addReaction({
                        ...reactState,
                        // so if user liked a blog then Liked will be shown instead of like because user has already liked the blog and when user again clicked on that liked button then the state will change to false again from true just like youtube like button
                        isLike:
                          allReactionsState && allReactions.user.isLike
                            ? false
                            : true,
                        isDislike: false,
                      })
                    }
                  >
                    {allReactionsState && allReactions.user.isLike
                      ? <ThumbUpAltIcon />
                      : <ThumbUpOffAltIcon />
                      }
                  </button>
                  <button
                    className="ml-2"
                    onClick={() =>
                      reaction.addReaction({
                        ...reactState,
                        isLike: false,
                        isDislike:
                          allReactionsState && allReactions.user.isDislike
                            ? false
                            : true,
                      })
                    }
                  >
                    {allReactionsState && allReactions.user.isDislike
                      ? <ThumbDownAltIcon />
                      : <ThumbDownOffAltIcon />
                    }
                  </button>
                </div>
                {auth.state.user.role === 'user' && (
                  <div className="absolute right-2 cursor-pointer">
                    {/* if the blog on which user clicked is already in favorite then show Heart Icon else not */}
                    {blog.state.getFavoriteBlog.data ? (
                      <span
                      onClick={() => blog.removeFavoriteBlog({
                        userId: auth.state.user?.id,
                        articleId: getBlog.id,
                        ownerId
                      })} 
                      title="Remove From Favortie">
                        <FavoriteIcon />
                      </span>
                    ) : (
                      <span 
                      onClick={() => blog.addFavoriteBlog({
                        userId: auth.state.user?.id,
                        articleId: getBlog.id,
                        ownerId
                      })} 
                      title="Add To Favortie"
                      >
                        <FavoriteBorderIcon />
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="p-5 flex flex-col items-center">
              <h5 className="mb-4 text-2xl font-bold tracking-tight  text-white">
                {blogView.title} {blog.state.getBlog.data?.id}
              </h5>
              <p className="mb-3 font-normal  text-gray-400">
                {blogView.content}
              </p>
            </div>
            <div className="flex justify-between mr-3">
              <div className="flex text-white">
                <p>Likes : {allReactions && allReactions.totalLikes}</p>
                <p className="ml-2">
                  Dislikes : {allReactions && allReactions.totalDislikes}
                </p>
              </div>
              <Link
                className="text-white"
                to={ROUTE_PATHS.VIEW_PROFILE + owner?.id}
              >
                Uploaded By : <span className="hover:text-blue-400">{owner?.username}</span> 
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="my-8">
        <CommentsPage ownerId={ownerId} />
      </div>
    </div>
  );
}

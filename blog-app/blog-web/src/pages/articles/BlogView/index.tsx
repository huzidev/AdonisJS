import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useReactions } from "store/reactions";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import "utils/responsive.css";
import CommentsPage from "../comments/AddComment";
import { useGetBlogPageHooks } from "./hooks";
import { AddReactionState, BlogState } from "./types";

export default function ViewBlogPage(): JSX.Element {
  const user = useUser();
  const auth = useAuth();
  const loggedInId: any = auth.state.user?.id;
  const reaction = useReactions();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
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
            <div className="rounded-lg relative">
              <img
                className="rounded-t-lg h-96 w-full"
                src={require(`assets/astronomy.jpg`)}
                alt="Thumbnail"
              />
              {auth.state.user && (
                <div className="text-white flex w-full absolute top-2">
                  <div className="ml-2">
                    <button
                      title={
                        allReactionsState && allReactions.user.isLike
                          ? "Remove like"
                          : "like"
                      }
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
                      {allReactionsState && allReactions.user.isLike ? (
                        <ThumbUpAltIcon />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                    </button>
                    <button
                      title={
                        allReactionsState && allReactions.user.isDislike
                          ? "Remove Dislike"
                          : "Dislike"
                      }
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
                      {allReactionsState && allReactions.user.isDislike ? (
                        <ThumbDownAltIcon />
                      ) : (
                        <ThumbDownOffAltIcon />
                      )}
                    </button>
                  </div>
                  {auth.state.user.role === "user" ? (
                    <div className="absolute right-2 cursor-pointer">
                      {/* if the blog on which user clicked is already in favorite then show Heart Icon else not */}
                      {blog.state.getFavoriteBlog.data ? (
                        <span
                          onClick={() =>
                            blog.removeFavoriteBlog({
                              userId: loggedInId,
                              articleId: getBlog.id,
                              ownerId,
                            })
                          }
                          title="Remove From Favortie"
                        >
                          <FavoriteIcon />
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            blog.addFavoriteBlog({
                              userId: loggedInId,
                              articleId: getBlog.id,
                              ownerId,
                            })
                          }
                          title="Add To Favortie"
                        >
                          <FavoriteBorderIcon />
                        </span>
                      )}
                    </div>
                  ) : (
                    (loggedInId === ownerId ||
                      (hasPermission("admin", auth.state.user?.role) &&
                        owner?.role !== "super-admin")) && (
                      // ||hasPermission("super-admin", userData?.role)
                      <>
                        <div
                          className="absolute right-0 hover:border-white hover:border-2"
                          onClick={() => setShowModal(!showModal)}
                        >
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-200 rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-50"
                            type="button"
                            // when user clicked on three-dots drop-down first then add comment.id in it and when user clicked again on three-dots drop-down then add null so three-dots drop-down get hidden
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            </svg>
                          </button>
                        </div>
                        <div>
                          <ul
                            className="absolute right-0 top-7 block divide-gray-100 rounded-lg shadow bg-gray-300"
                            aria-labelledby="dropdownDefaultButton"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <li>
                              <Link
                                to={ROUTE_PATHS.ARTICLE_UPDATE + getBlog?.slug}
                                type="button"
                                className="text-white bg-gray-800 font-medium text-sm py-2.5 px-3 w-full text-center"
                              >
                                Edit
                              </Link>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="text-white bg-gray-800 font-medium text-sm py-2.5 px-3 w-full text-center"
                                onClick={() => {
                                  setDeleteBlogId(getBlog.id);
                                  setShowModal(true);
                                }}
                              >
                                Delete
                              </button>
                            </li>
                            {showModal && deleteBlogId === getBlog.id && (
                              <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
                                <div className="bg-white p-8 w-96 dark:text-white dark:bg-darkBG rounded-lg">
                                  <p className="text-lg text-center mb-4">
                                    Are you sure you want to delete this blog?
                                  </p>
                                  <div className="flex justify-center space-x-4">
                                    <button
                                      className="bg-red-500 text-white px-4 py-2 rounded"
                                      onClick={() => {
                                        blog.deleteBlog(getBlog.id);
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
                          </ul>
                        </div>
                      </>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="p-5 w-[90%] mx-auto flex flex-col text-center">
              <h5 className="mb-4 text-2xl font-bold tracking-tight  text-white">
                {blogView.title} {blog.state.getBlog.data?.id}
              </h5>
              <p className="mb-3 font-normal text-gray-400">
                {blogView.content}
              </p>
            </div>
            <div className="flex justify-between mr-3 ml-2">
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
                Uploaded By :{" "}
                <span className="hover:text-blue-400">{owner?.username}</span>
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

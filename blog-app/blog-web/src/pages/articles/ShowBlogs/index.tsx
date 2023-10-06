import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import 'utils/Modal/index.css';
import { LoaderSpin, LoadingListBlogs } from "utils/loading";
import 'utils/responsive.css';
import { useShowBlogsHook } from "./hooks";
import './styles.css';
// import { props.columns } from './data';
// import { BlogState } from "./types";

export default function ShowBlogs(props: any): JSX.Element {
  const blogs = useBlogs();
  const auth = useAuth();
  const user = useUser();
  const navigate = useNavigate();
  const allUsers = user.state.allUser?.data;
  const userData = auth.state.user;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<number | null>(null);
  const params = useParams();
  const isMe: boolean = params.id === "me";
  const isUser: boolean = auth.state.user?.role === "user";
  const { isViewProfile, currentPath } = useShowBlogsHook();
  
  const favBlogs =
  // isViewProfile && !isMe means user has clicked on some other user's profile 
    isViewProfile && !isMe || currentPath.includes('/blogs')
      ? blogs.state.getAllFavoriteBlogs.data
      : blogs.state.getFavoriteBlogs.data;

  return (
    <div className="responsive m-auto flex flex-col">
      <div className="relative mb-8 mt-4">
        {
            <div className="absolute">
              <h1 className="text-2xl font-bold tracking-tight dark:text-white">
                {/* if role is user then user can't upload the blogs hence show blogs Liked by you else if blogger loggedIn then show blogs Uploaded by You */}
                {/* isLoadingUser ? "" so when userState is in loading then don't show anything otherwise it'll show Blogs Uploaded while user state is in loading */}
                {
                  isViewProfile ? (
                    props.isLoading
                      ? ''
                      : (isUser && isMe) || props.isRole === "user"
                      ? `Blogs Liked By ${isMe ? "You" : props.userDetails.username}`
                      : `Blogs Uploaded By ${!isMe ? props.userDetails.username : "You"}`
                  ) : (
                    (!props.isFilter ? 'All' : startCase(props.isFilter)) + ' Blogs'
                  )
                }
              </h1> 
            </div>
        }
        {/* Only show filters and reset filter when user selects filters therefore the value will stored in sortValue.value BUT
        if user haven't uploaded any blog then don't show filters and reset filter button also NOT to show filters when clicked on user with user role */}
        {((props.allBlogs.length && props.allBlogs.length === 0) && props.sortValue.value) || props.userDetails?.role !== "user" && (
          <div>
            <div className="absolute right-0">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="filter-actions hover:bg-blue-700 mr-2"
                type="button"
                onClick={() => setDropDown(!dropDown)}
              >
                Filters{" "}
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
                      ? "block absolute divide-y divide-gray-100 rounded-lg shadow w-32 bg-gray-700"
                      : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {props.columns.map((data: any, index: number) => (
                      // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                      <li
                        onClick={() => props.handleSort(data.title)}
                        className="px-5 py-3 cursor-pointer"
                        key={index}
                      >
                        {/* startCase will make the first letter Capital of any word */}
                        {startCase(data.title)}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`filter-actions ${props.sortValue.value ? 'cursor-pointer' : 'cursor-not-allowed disabled:opacity-60'}`}
                  disabled={props.sortValue.value ? false : true}
                  onClick={() => {
                    props.handleSort("");
                    setDropDown(false);
                  }}
                >
                  Reset Filters
                </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        {/* if their is some data in props.allBlogs then don't show skeleton loading because then load more spinner will run while fetching data */}
        {(
          isViewProfile
            ? (props.isLoadingBlogs || props.isLoadingFvrtBlogs) &&
              !props.allBlogs.length
            : props.isLoading && !props.allBlogs.length
        ) ? (
          <LoadingListBlogs />
        ) : (
          props.allBlogs.map((blog: any, index: number) => {
            // allUsers? is mandatory as it can be empty
            const uploadedByUser = allUsers?.find(
              (user: User) => user.id === blog.ownerId
            );
            const isBannedUser: any = uploadedByUser && uploadedByUser.isBanned;
            const uploadedByUserRole = uploadedByUser && uploadedByUser.role;
            const uploadedByUserId = uploadedByUser && uploadedByUser.id;
            const uploadedByUsername =
              uploadedByUser && uploadedByUser.username;

            return (
              // ${index % 3 === 1 && 'mx-4'} so margin will only be added on the middle div
              <div
                key={blog.id}
                title="Read More"
                className={`w-[32%] relative mt-8 ${
                  index % 3 === 1 ? "3xl:mx-4 2xl" : ''
                } margin`}
                onClick={() => navigate(ROUTE_PATHS.ARTICLE_VIEW + blog.slug)}
              >
                {/* <img src={ele.image} alt="Thumbnail" /> */}
                <div className="border rounded-lg shadow bg-gray-800 border-gray-700 relative">
                  {(blog.ownerId === userData?.id ||
                      (hasPermission("admin", userData?.role) &&
                        uploadedByUserRole !== "super-admin") 
                      // ||hasPermission("super-admin", userData?.role)
                      ) && (
                        <>
                        <div
                          className="drop-down"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSettings( isSettings === blog.id ? null : blog.id );
                          }}
                        >
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            className="modal-button"
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
                        <>
                        {isSettings === blog.id && (
                          <div>
                            <ul
                              className="modal-menu"
                              aria-labelledby="dropdownDefaultButton"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <li>
                                <Link
                                  to={ROUTE_PATHS.ARTICLE_UPDATE + blog.slug}
                                  type="button"
                                  className="modal-actions"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="modal-actions"
                                  onClick={() => {
                                    setDeleteBlogId(blog.id);
                                    setShowModal(true);
                                  }}
                                >
                                  Delete
                                </button>
                              </li>
                              {showModal && deleteBlogId === blog.id && (
                                <div className="modal-container">
                                  <div className="modal-content">
                                    <p className="text-lg text-center mb-4">
                                      Are you sure you want to delete this blog?
                                    </p>
                                    <div className="flex justify-center space-x-4">
                                      <button
                                        className="bg-red-500 modal-button-actions"
                                        onClick={() => {
                                          blogs.deleteBlog(blog.id);
                                          setShowModal(false);
                                        }}
                                      >
                                        Yes
                                      </button>
                                      <button
                                        className="bg-gray-500 modal-button-actions"
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
                        )}
                        </>
                        </>
                      )}
                  <img
                    className="rounded-t-lg"
                    src={require(`assets/astronomy.jpg`)}
                    alt="Thumbnail"
                  />
                  <div className="p-5">
                    <div className="flex justify-between flex-col">
                      <h1 className="mb-1 tracking-wide text-blue-200">
                        {blog.category.charAt(0).toUpperCase() +
                          blog.category.slice(1)}
                      </h1>
                      <h1
                        title={blog.title}
                        className="mb-1 text-xl truncate font-semibold text-white"
                      >
                        {/* {blog.title.length > 21
                          ? `${blog.title.slice(0, 21)}...`
                          : blog.title} */}
                          {blog.title}
                      </h1>
                      {
                        // only if loggedIn user's role is user then show heart icon for adding blogs in favorite
                        auth.state.user && auth.state.user.role === "user" && (
                          <div
                            title={
                              (favBlogs.find(
                                (favoriteBlog: any) =>
                                  favoriteBlog.id === blog.id
                              )
                                ? "Remove From"
                                : "Add to") + " favorite"
                            }
                            className={`p-2 absolute top-0 right-1 rounded-full w-10 transition-colors duration-300 cursor-pointer ${
                              favBlogs.find(
                                (favoriteBlog: any) =>
                                  favoriteBlog.id === blog.id
                              )
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              favBlogs.find(
                                (favoriteBlog: any) =>
                                  favoriteBlog.id === blog.id
                              )
                                ? blogs.removeFavoriteBlog({
                                    userId: auth.state.user?.id,
                                    articleId: blog.id,
                                    ownerId: blog.ownerId,
                                  })
                                : blogs.addFavoriteBlog({
                                    userId: auth.state.user?.id,
                                    articleId: blog.id,
                                    ownerId: blog.ownerId,
                                  });
                            }}
                          >
                              {favBlogs.find(
                                (favoriteBlog: any) =>
                                  favoriteBlog.id === blog.id
                              ) ? (
                                <FavoriteIcon />
                              ) : (
                                <FavoriteBorderIcon />
                              )}
                          </div>
                        )
                      }
                    </div>
                    <p
                      title={blog.content}
                      className="mb-3 font-normal truncate text-gray-400"
                    >
                      {/* {blog.content.length > 42
                        ? `${blog.content.slice(0, 42)}...`
                        : blog.content} */}
                        {blog.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center w-3/4">
                        <img
                          className="w-10 h-10 rounded-full bg-black"
                          src="/docs/images/people/profile-picture-5.jpg"
                        />
                        {/* e.stopPropagation() because we've create onClick event on complete div therefore if we didn't use e.stopPropagation() then onClicking useranme it'll fetch user to blog instead of user name therefore uses e.stopPropagation() */}
                        <p
                          className="text-white ml-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isBannedUser ||
                          (props.userDetails && props.userDetails.isBanned) ? (
                            <del
                              onClick={() =>
                                navigate(
                                  ROUTE_PATHS.VIEW_PROFILE + blog.ownerId
                                )
                              }
                              title="Banned User"
                              className="text-red-600"
                            >
                              {isViewProfile &&
                              props.userDetails.role !== "user"
                                ? props.userDetails &&
                                  props.userDetails.username
                                : uploadedByUsername}
                            </del>
                          ) : (
                            <>
                              <Link
                                to={
                                  blog.ownerId === auth.state.user?.id
                                    ? ROUTE_PATHS.VIEW_PROFILE + "me"
                                    : ROUTE_PATHS.VIEW_PROFILE + blog.ownerId
                                }
                                type="button"
                                className="text-sm font-medium text-center text-white hover:text-blue-500"
                              >
                                {isViewProfile &&
                                props.userDetails.role !== "user"
                                  ? props.userDetails &&
                                    props.userDetails.username
                                  : uploadedByUsername}
                              </Link>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="w-1/4">
                        <p className="text-white">
                          {/* Uploaded At :{" "} */}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-white flex justify-around">
                      <span className="border-gray-200 border-[0.5px] w-full flex items-center justify-center">
                        <ThumbUpOffAltIcon />
                        <p className="ml-2">
                          {/* to show Total likes of every blogs and ?? is used if totalCount is undefined means no like then show 0 */}
                          {props.allReactions &&
                            (props.allReactions.filter(
                              (value: any) => value.articleId === blog.id
                            )[0]?.likeCount ??
                              "0")}
                        </p>
                      </span>
                      <span className="ml-2 border-gray-200 border-[0.5px] w-full flex items-center justify-center">
                        <ChatBubbleOutlineIcon />
                        <p className="ml-2">
                          {/* to show Total likes of every blogs and ?? is used if totalCount is undefined means no like then show 0 */}
                          {props.allComments &&
                            (props.allComments.filter(
                              (value: any) => value.articleId === blog.id
                            )[0]?.commentCount ??
                              "0")}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        {/* if both currentPage is = to lastPage means final page hence no more fetching after that */}
      </div>
      {isViewProfile
        ? !props.isLoading &&
          !props.isLoadingBlogs &&
          props.allBlogs.length === 0 && (
            <div className="w-full mt-5 py-8 pl-5 border rounded-lg shadow bg-gray-800 border-gray-700">
              <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
                Oops...
                {/* if clickedUser role is user */}
                {user.state.getUser.data?.role === "user" && !isMe
                  ? `${props.userDetails.username} haven't Liked`
                  : // if LoggedIn user's role is user and path includes "me"
                  isUser && isMe
                  ? "You haven't Liked"
                  : // if user role is not user and path includes "me" then show You haven't Uploaded any blog yet
                    `${
                      isMe ? "You" : props.userDetails.username
                    } haven't uploaded`}{" "}
                any blog{" "}
                {!!props.isFilter && `related to ${props.isFilter} category`}
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
          )
        : !props.isLoading &&
          props.allBlogs.length === 0 && (
            <div className="w-full mt-5 py-8 pl-5 border rounded-lg shadow bg-gray-800 border-gray-700">
              <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
                Oops... No one has uploaded any blog
                {!!props.isFilter && ` related to ${props.isFilter} category`}
              </h1>
              <Link
                to={ROUTE_PATHS.ARTICLE_CREATE}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                title={isMe && !isUser ? "Add Blog" : "Explore Blogs"}
              >
                {/* if path includes "me" and loggedIn user role is not "user" then show add blog in brief if user role is not user then show add blog and if user clikced on someone else then show Explore Blogs */}
                Add Blog
              </Link>
            </div>
          )}
      {isViewProfile ? (
        <div className="w-11/12 m-auto mt-5">
          {/* so load more button will only be visible when their is currentPage OR props.currentPageFvrt and if currentPage and lastPage values 
          became equal then don't show load more button anymore
          */}
          {
            // totalBlogs and totalFvrtBlogs conditon so load more button won't be shown when user have total blogs length less than 15
            !props.isLoading &&
              (props.userDetails.role === "user"
                ? props.currentPageFvrt !== props.lastPageFvrt
                : props.currentPageBlogs !== props.lastPageBlogs) &&
              (props.userDetails.role === "user"
                ? props.totalFvrtBlogs > 15
                : props.totalBlogs > 15) && (
                <button
                  className="bg-blue-500 flex items-center justify-center hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={props.loadMore}
                >
                  {/* so spinner with load more will only be shown when loading state is true and their is some data because if their is no data then load more will not be shown */}
                  Load More{" "}
                  {(props.isLoadingBlogs || props.isLoadingFvrtBlogs) &&
                    props.allBlogs.length && <LoaderSpin />}
                </button>
              )
          }
        </div>
      ) : (
        <div className="mt-5">
          {props.currentPageBlogs !== props.lastPageBlogs && (
            <button
              className="bg-blue-500 flex items-center justify-center hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={props.loadMore}
            >
              {/* so spinner with load more will only be shown when loading state is true and their is some data because if their is no data then load more will not be shown */}
              Load More{" "}
              {props.isLoading && props.allBlogs.length && <LoaderSpin />}
            </button>
          )}
        </div>
      )}
      <div className="test">
            Hello
      </div>
    </div>
  );
}

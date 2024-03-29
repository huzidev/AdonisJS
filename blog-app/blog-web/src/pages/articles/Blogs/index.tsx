import qs from "query-string";
import { useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import ShowBlogs from "../ShowBlogs/index";
import { columns } from "./data";
import { useBlogsPageHooks } from "./hooks";

export default function ViewBlogsPage(): JSX.Element {
  const blogs = useBlogs();
  const auth = useAuth();
  const user = useUser();
  const allUsers = user.state.allUser?.data;
  const allBlogs = blogs.state.getBlogs?.data;
  const userData = auth.state.user;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteBlogId, setDeleteBlogId] = useState<number | null>(null);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const currentPageBlogs: any = blogs.state.getBlogs.meta?.currentPage;
  const lastPageBlogs: any = blogs.state.getBlogs.meta?.lastPage;
  const { loadMore, handleSort, sortValue, isLoading, allReactions, allComments } = useBlogsPageHooks();
  const search: any = qs.parse(window.location.search);

  let isFilter;
  if (search.sort) {
    isFilter = Object.values(JSON.parse(search.sort))[0];
  }

  return (
    <div>
      <ShowBlogs 
        sortValue={sortValue}
        handleSort={handleSort}
        allBlogs={allBlogs}
        columns={columns}
        isLoading={isLoading}
        allReactions={allReactions}
        allComments={allComments}
        currentPageBlogs={currentPageBlogs}
        lastPageBlogs={lastPageBlogs}
        loadMore={loadMore}
        isFilter={isFilter}
      />
    </div>
    // <div className="w-[1500px] m-auto flex flex-col">
    //   <div>
    //     {sortValue.value && (
    //       <button
    //         className="text-white mr-5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
    //         onClick={() => handleSort('')}
    //       >
    //         Reset Filters
    //       </button>
    //     )}
    //     {
    //       allBlogs.length >= 1 && (
    //         <div>
    //           <button
    //             id="dropdownDefaultButton"
    //             data-dropdown-toggle="dropdown"
    //             className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
    //             type="button"
    //             onClick={() => setDropDown(!dropDown)}
    //           >
    //             Filter List{" "}
    //             <svg
    //               className="w-2.5 h-2.5 ml-2.5"
    //               aria-hidden="true"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 10 6"
    //             >
    //               <path
    //                 stroke="currentColor"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="m1 1 4 4 4-4"
    //               />
    //             </svg>
    //           </button>
    //           <div
    //             id="dropdown"
    //             className={`z-10 ${
    //               dropDown
    //                 ? "block fixed divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
    //                 : "hidden"
    //             }`}
    //           >
    //             <ul
    //               className="py-2 text-sm text-gray-200"
    //               aria-labelledby="dropdownDefaultButton"
    //             >
    //               {columns.map((data, index: number) => (
    //                 // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
    //                 <li
    //                   onClick={() => handleSort(data.title)}
    //                   className="px-5 py-3 cursor-pointer"
    //                   key={index}
    //                 >
    //                   {/* startCase will make the first letter Capital of any word */}
    //                   {startCase(data.title)}
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //       )
    //     }
    //   </div>
    //   <div className="flex flex-wrap">
    //     {/* if their is some data in allBlogs then don't show skeleton loading because then load more spinner will run while fetching data */}
    //     {isLoading && !allBlogs.length ? (
    //       <LoadingListBlogs />
    //     ) : (
    //       allBlogs.map((blog: BlogState, index: number) => {
    //         // allUsers? is mandatory as it can be empty
    //         const uploadedByUser = allUsers?.find(
    //           (user: User) => user.id === blog.ownerId
    //         );
    //         const isBannedUser: any = uploadedByUser && uploadedByUser.isBanned;
    //         const uploadedByUserRole = uploadedByUser && uploadedByUser.role;
    //         const uploadedByUserId = uploadedByUser && uploadedByUser.id;
    //         const uploadedByUsername =
    //           uploadedByUser && uploadedByUser.username;
              
    //         return (
    //           // ${index % 3 === 1 && 'mx-4'} so margin will only be added on the middle div
    //         <div key={blog.id} title="Read More" className={`w-[32%] mt-8 ${index % 3 === 1 && 'mx-4'} margin cursor-pointer`} onClick={() => navigate(ROUTE_PATHS.ARTICLE_VIEW + blog.slug)}>
    //             {/* <img src={ele.image} alt="Thumbnail" /> */}
    //             <div className="border rounded-lg shadow bg-gray-800 border-gray-700 relative">
    //               <div className="absolute right-0" onClick={(e => e.stopPropagation())}>
    //                 <button
    //                   id="dropdownComment1Button"
    //                   data-dropdown-toggle="dropdownComment1"
    //                   className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-200 rounded-lg focus:ring-1 focus:outline-none focus:ring-gray-50"
    //                   type="button"
    //                   // when user clicked on three-dots drop-down first then add comment.id in it and when user clicked again on three-dots drop-down then add null so three-dots drop-down get hidden
    //                 >
    //                   <svg
    //                     className="w-5 h-5"
    //                     aria-hidden="true"
    //                     fill="currentColor"
    //                     viewBox="0 0 20 20"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                   >
    //                     <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
    //                   </svg>
    //                 </button>
    //               </div>
    //               <img
    //                 className="rounded-t-lg"
    //                 src={require(`assets/astronomy.jpg`)}
    //                 alt="Thumbnail"
    //               />
    //               <div className="p-5">
    //                 <div className="flex justify-between flex-col">
    //                   <h1 className="mb-1 tracking-wide text-blue-200">
    //                     {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
    //                   </h1>
    //                   <h1
    //                     title={blog.title}
    //                     className="mb-1 text-xl font-semibold text-white"
    //                   >
    //                     {blog.title.length > 21
    //                       ? `${blog.title.slice(0, 21)}...`
    //                       : blog.title}
    //                   </h1>
    //                   {
    //                     // only if loggedIn user's role is user then show heart icon for adding blogs in favorite
    //                     auth.state.user && auth.state.user.role === "user" && (
    //                       <div
    //                         title={
    //                           (favoriteBlogs.find(
    //                             (favoriteBlog) => favoriteBlog.id === blog.id
    //                           )
    //                             ? "Remove From"
    //                             : "Add to") + " favorite"
    //                         }
    //                         className={`p-2 rounded-full transition-colors duration-300 ${
    //                           favoriteBlogs.find(
    //                             (favoriteBlog) => favoriteBlog.id === blog.id
    //                           )
    //                             ? "text-red-500"
    //                             : "text-gray-500"
    //                         }`}
    //                         onClick={() =>
    //                           favoriteBlogs.find(
    //                             (favoriteBlog) => favoriteBlog.id === blog.id
    //                           )
    //                             ? blogs.removeFavoriteBlog({
    //                                 articleId: blog.id,
    //                                 ownerId: blog.ownerId,
    //                               })
    //                             : blogs.addFavoriteBlog({
    //                                 userId: auth.state.user?.id,
    //                                 articleId: blog.id,
    //                                 ownerId: blog.ownerId,
    //                               })
    //                         }
    //                       >
    //                         <svg
    //                           className="w-6 h-6"
    //                           fill="currentColor"
    //                           viewBox="0 0 20 20"
    //                           xmlns="http://www.w3.org/2000/svg"
    //                         >
    //                           {favoriteBlogs.find(
    //                             (favoriteBlog) => favoriteBlog.id === blog.id
    //                           ) ? (
    //                             <path
    //                               fillRule="evenodd"
    //                               clipRule="evenodd"
    //                               d="M17.725 5.275a5.5 5.5 0 1 0-7.778 0L10 6.293l-.947-.948a5.5 5.5 0 1 0-7.778 7.778l.947.947L10 18.243l6.725-6.725.947-.947a5.5 5.5 0 0 0 0-7.778z"
    //                             />
    //                           ) : (
    //                             <path
    //                               fillRule="evenodd"
    //                               clipRule="evenodd"
    //                               d="M17.725 5.275a5.5 5.5 0 1 0-7.778 0L10 6.293l-.947-.948a5.5 5.5 0 1 0-7.778 7.778l.947.947L10 18.243l6.725-6.725.947-.947a5.5 5.5 0 0 0 0-7.778l-.947-.947z"
    //                             />
    //                           )}
    //                         </svg>
    //                       </div>
    //                     )
    //                   }
    //                 </div>
    //                 <p
    //                   title={blog.content}
    //                   className="mb-3 font-normal  text-gray-400"
    //                 >
    //                   {blog.content.length > 42
    //                     ? `${blog.content.slice(0, 42)}...`
    //                     : blog.content}
    //                 </p>
    //                 {/* <div className="flex justify-between">
    //                   <Link
    //                     to={ROUTE_PATHS.ARTICLE_VIEW + blog.slug}
    //                     className="text-sm font-medium text-center text-white hover:text-blue-500"
    //                   >
    //                     Read More
    //                   </Link>
    //                   <p className="text-white">
    //                     {/* Likes : {allReactions && (allReactions.filter((value: any) => value.articleId === blog.id)[0]?.likeCount ?? "0")}
    //                   </p>
    //                 </div> */}
    //                 {/* Only if ownerId of blog matches loggedIn user id OR admin and super-admin can Edit and Delete AND if loggedIn user is admin then admin Can't update or delte blog by super-admin */}
    //                 {/* {(blog.ownerId === userData?.id ||
    //                   (hasPermission("admin", userData?.role) &&
    //                     uploadedByUserRole !== "super-admin") 
    //                   // ||hasPermission("super-admin", userData?.role)
    //                   ) &&
    //                   // if user is banned then edit and delete button won't be shown just view profile button will show to update user details for admin and super-admin
    //                   (isBannedUser ? (
    //                     <div>
    //                       <Link
    //                         to={ROUTE_PATHS.VIEW_PROFILE + uploadedByUserId}
    //                         type="button"
    //                         className="text-white bg-gray-800 font-medium text-sm py-2.5"
    //                       >
    //                         View Profile
    //                       </Link>
    //                     </div>
    //                   ) : (
    //                     <div>
    //                       <Link
    //                         to={ROUTE_PATHS.ARTICLE_UPDATE + blog.slug}
    //                         type="button"
    //                         className="text-white bg-gray-800 font-medium text-sm py-2.5"
    //                       >
    //                         Edit
    //                       </Link>
    //                       <button
    //                         type="button"
    //                         className="text-white bg-gray-800 font-medium text-sm ml-4 py-2.5"
    //                         // onClick={() => blogs.deleteBlog(blog.id)}
    //                         onClick={() => {
    //                           setDeleteBlogId(blog.id);
    //                           setShowModal(true);
    //                         }}
    //                       >
    //                         Delete
    //                       </button>
    //                       {showModal && deleteBlogId === blog.id && (
    //                         <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
    //                           <div className="bg-white p-8 w-96">
    //                             <p className="text-lg text-center mb-4">
    //                               Are you sure you want to delete this blog?
    //                             </p>
    //                             <div className="flex justify-center space-x-4">
    //                               <button
    //                                 className="bg-red-500 text-white px-4 py-2 rounded"
    //                                 onClick={() => {
    //                                   blogs.deleteBlog(blog.id);
    //                                   setShowModal(false);
    //                                 }}
    //                               >
    //                                 Yes
    //                               </button>
    //                               <button
    //                                 className="bg-gray-500 text-white px-4 py-2 rounded"
    //                                 onClick={() => setShowModal(false)}
    //                               >
    //                                 No
    //                               </button>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       )}
    //                     </div>
    //                   ))} */}
    //                 <div className="flex justify-between items-center">
    //                   <div className="flex items-center w-3/4">
    //                     <img className="w-10 h-10 rounded-full bg-black" src="/docs/images/people/profile-picture-5.jpg"></img>
    //                     {/* e.stopPropagation() because we've create onClick event on complete div therefore if we didn't use e.stopPropagation() then onClicking useranme it'll fetch user to blog instead of user name therefore uses e.stopPropagation() */}
    //                     <p className="text-white ml-3" onClick={(e => e.stopPropagation())}>
    //                       {isBannedUser ? (
    //                         <del title="Banned User" className="text-red-600">
    //                           {uploadedByUsername}
    //                         </del>
    //                       ) : (
    //                         <>
    //                         <Link
    //                           to={
    //                             blog.ownerId === auth.state.user?.id
    //                               ? ROUTE_PATHS.VIEW_PROFILE + "me"
    //                               : ROUTE_PATHS.VIEW_PROFILE + uploadedByUserId
    //                           }
    //                           type="button"
    //                           className="text-sm font-medium text-center text-white hover:text-blue-500"
    //                         >
    //                           {uploadedByUsername}
    //                         </Link>
    //                         </>
    //                       )}
    //                     </p>
    //                   </div>
    //                   <div className="w-1/4">
    //                     <p className="text-white">
    //                       {/* Uploaded At :{" "} */}
    //                       {new Date(blog.createdAt).toLocaleDateString()}
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <div className='mt-2 text-white flex justify-around'>
    //                   <span className='border-gray-200 border-[0.5px] w-full flex items-center justify-center'>
    //                     <ThumbUpOffAltIcon /> 
    //                     <p className='ml-2'>
    //                       {/* to show Total likes of every blogs and ?? is used if totalCount is undefined means no like then show 0 */}
    //                       {allReactions && (allReactions.filter((value: any) => value.articleId === blog.id)[0]?.likeCount ?? "0")}
    //                     </p>
    //                   </span>
    //                   <span className='ml-2 border-gray-200 border-[0.5px] w-full flex items-center justify-center'>
    //                     <ChatBubbleOutlineIcon />
    //                     <p className='ml-2'>
    //                       {/* to show Total likes of every blogs and ?? is used if totalCount is undefined means no like then show 0 */}
    //                       {allComments && (allComments.filter((value: any) => value.articleId === blog.id)[0]?.commentCount ?? "0")}
    //                     </p>
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })
    //     )}
    //     {/* if both currentPage is = to lastPage means final page hence no more fetching after that */}
    //   </div>
    //   <div className="mt-5">
    //     {currentPageBlogs !== lastPageBlogs && (
    //       <button
    //         className="bg-blue-500 flex items-center justify-center hover:bg-blue-600 text-white px-4 py-2 rounded"
    //         onClick={loadMore}
    //       >
    //         {/* so spinner with load more will only be shown when loading state is true and their is some data because if their is no data then load more will not be shown */}
    //         Load More {(isLoading && allBlogs.length) && (
    //           <LoaderSpin />
    //         )}
    //       </button>
    //     )}
    //   </div>
    // </div>
  );
}

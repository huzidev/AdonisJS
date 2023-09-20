import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { LoadingList } from "utils/loading";
import "utils/table/index.css";

export default function ManageRecords(props: any) {
  const auth = useAuth();
  const navigate = useNavigate();
  const isUsersPage = window.location.pathname.includes('/user/list/') ? true : false;

  console.log("is user page", isUsersPage);

  return (
    <div className="table-main">
      <div className="content">
        <div>
          <h2 className="headings-content">
            {
                isUsersPage ? (
                    "Manage Users"
                ) : (
                    props.isAdmin ? "Manage Blogs" : "Manage Your Blogs"
                )
            }
          </h2>
          <span className="text-content">
            {
                isUsersPage ? (
                    "View accounts of registered users"
                ) : (
                    `View ${props.isAdmin ? "all uploaded blogs" : "blogs uploaded by you"}`
                )
            }
          </span>
        </div>
        {
            isUsersPage && (
                <div className="flex items-center justify-between">
                    <div className="ml-10 space-x-8 lg:ml-40">
                        <button
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
                        title="Create User"
                        onClick={() => navigate(ROUTE_PATHS.USER_CREATE)}
                        >
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                        >
                            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                        </svg>
                        Create User
                        </button>
                    </div>
                </div>
            )
        }
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                {props.columns.map((data: any, index: number) =>
                  // because we don't wanna put onClick filters on sno and actions field therefore using props.constKeys conditions
                  // So uploaded by won't be shown when blogger clikced on manage blogs uploaded by will only be visible when admin state is true
                  data.title === "uploadedBy" && !props.isAdmin ? null : (
                    <th
                      className="px-5 py-3 cursor-pointer"
                      key={index}
                      onClick={
                        !props.constKeys.includes(data.key)
                          ? // ternary operator when user clicked on uploadedBy then their is no field named uploadedBy hence send username instead of uploadedBy
                            () =>
                              props.handleSort(
                                data.key === "uploadedBy"
                                  ? "username"
                                  : data.key
                              )
                          : undefined
                      }
                    >
                      {/* startCase will make the first letter Capital of any word */}
                      {startCase(data.title)}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {props.isLoading ? (
                <tr>
                  <td colSpan={12}>
                    <LoadingList />
                  </td>
                </tr>
              ) : (
                props.allBlogs?.map((blog: any, index: number) => {
                  const uploadedByUser = props.allUsers?.find(
                    (user: User) => user.id === blog.ownerId
                  );
                  const uploadedByUserRole =
                    uploadedByUser && uploadedByUser.role;
                  const uploadedByUserId = uploadedByUser && uploadedByUser.id;
                  const uploadedByUsername =
                    uploadedByUser && uploadedByUser.username;
                  return (
                    // key={userIndex} always add at top of JSX since tr is the main parent therefore pass key={userIndex} here If we've covered it in <div> or in <></> and then tries to pass key={userIndex} in tr then we'll get the error because then div and <></> will the main parent and will be at the top of JSX
                    <tr key={index}>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{index + 1}</p>
                      </td>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{blog.id}</p>
                      </td>
                      {props.isAdmin && (
                        <td className="table-content">
                          <p className="whitespace-no-wrap">
                            {blog.ownerId === uploadedByUserId &&
                              (uploadedByUserRole === "super-admin"
                                ? `${uploadedByUsername + " *"}`
                                : uploadedByUsername)}
                          </p>
                        </td>
                      )}
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{blog.title}</p>
                      </td>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">
                          {blog.content.length > 45
                            ? `${blog.content.slice(0, 45)}...`
                            : blog.content}
                        </p>
                      </td>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{blog.category}</p>
                      </td>
                      <td className="table-content">
                        <span className="whitespace-no-wrap">
                          {/* just show dates not time while toLocaleString shows complete date and time */}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="table-content">
                        <span
                          className="whitespace-no-wrap"
                          title="Last Update"
                        >
                          {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="table-content">
                        <div className="flex">
                          <button
                            className="table-content-actions"
                            onClick={() =>
                              navigate(
                                (auth.state.user?.role === "admin" &&
                                uploadedByUserRole === "super-admin"
                                  ? ROUTE_PATHS.ARTICLE_VIEW
                                  : ROUTE_PATHS.ARTICLE_UPDATE) + blog.slug
                              )
                            }
                          >
                            {auth.state.user?.role === "admin" &&
                            uploadedByUserRole === "super-admin"
                              ? "View Blog"
                              : "Edit"}
                          </button>
                          {auth.state.user?.role === "super-admin" && (
                            <button
                              className="table-content-actions"
                              onClick={() =>
                                navigate(ROUTE_PATHS.ARTICLE_VIEW + blog.slug)
                              }
                            >
                              &nbsp; View
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {!props.isLoading && props.allBlogs.length && (
          <div className="table-footer">
            <span className="table-footer-content">
              Showing {props.currentPage} of
              <button
                title="Last page"
                className="text-blue-300"
                onClick={() => navigate(ROUTE_PATHS.ARTICLES_PAGE + props.lastPage)}
              >
                &nbsp;
                {props.lastPage}
              </button>
            </span>
            <div className="table-footer-container">
              {props.currentPage !== 1 && (
                <div>
                  <button
                    className="table-footer-actions mr-2"
                    onClick={() =>
                      navigate(
                        ROUTE_PATHS.ARTICLES_PAGE +
                          (props.currentPage! - 1 + window.location.search)
                      )
                    }
                  >
                    Prev
                  </button>
                  <button
                    className="table-footer-actions mr-2"
                    onClick={() => navigate(ROUTE_PATHS.ARTICLES_PAGE + 1)}
                  >
                    First
                  </button>
                </div>
              )}
              {props.currentPage !== props.lastPage && (
                <button
                  className="table-footer-actions"
                  onClick={() =>
                    navigate(
                      ROUTE_PATHS.ARTICLES_PAGE +
                        (props.currentPage! + 1) +
                        window.location.search
                    )
                  }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {!props.isLoading && !props.allBlogs.length && (
        <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
            {/* Oops... {props.isAdmin ? "No one has" : "You haven't"} uploaded any blog yet. */}
            Oops... {auth.state.user?.role === 'blogger' ? `You haven't` : `No one has`} uploaded any blog {!!props.isFilter && `related to ${props.isFilter} category`}.
          </h1>
          <Link
            to={ROUTE_PATHS.ARTICLE_CREATE}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            title="Add Blog"
          >
            {/* if path includes "me" and loggedIn user role is not "user" then show add blog in brief if user role is not user then show add blog and if user clikced on someone else then show Explore Blogs */}
            Add Blog
          </Link>
        </div>
      )}
    </div>
  );
}

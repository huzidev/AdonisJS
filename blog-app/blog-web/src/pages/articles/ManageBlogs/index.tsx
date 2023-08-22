import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { useFiltersHook } from "utils/filters";
import { LoadingList } from "utils/loading";
import 'utils/table/index.css';
import { columns, constKeys } from "./data";
import { useManageBlogsPageHooks } from "./hooks";

export default function ManageBlogsPage() {
  const blogs = useBlogs();
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();
  const isAdmin = hasPermission(
    "admin",
    auth.state.user?.role
  );

  const { handleSort } = useFiltersHook();

  const dataByMe = blogs.state.getMyList;
  const dataByUser = blogs.state.getBlogsList;
  const allBlogs = isAdmin ? dataByUser.data : dataByMe.data;
  const allUsers = user.state.allUser?.data;
  const currentPage = isAdmin
    ? dataByUser.meta?.currentPage
    : dataByMe.meta?.currentPage;
  const lastPage = isAdmin
    ? dataByUser.meta?.lastPage
    : dataByMe.meta?.lastPage;
  useManageBlogsPageHooks();

  const isLoading = blogs.state.getBlogsList.loading;
    
    console.log("currentPage", currentPage);

  return (
    <div className="table-main">
      <div className="content">
        <div>
          <h2 className="headings-content">
            {isAdmin ? "Manage Blogs" : "Manage Your Blogs"}
          </h2>
          <span className="text-content">
            {`View ${isAdmin ? "all uploaded blogs" : "blogs uploaded by you"}`}
          </span>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                {columns.map((data, columnIndex) =>
                  // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                  // So uploaded by won't be shown when blogger clikced on manage blogs uploaded by will only be visible when admin state is true
                  data.title === "uploadedBy" && !isAdmin ? null : (
                    <th
                      className="px-5 py-3 cursor-pointer"
                      key={columnIndex}
                      onClick={
                        !constKeys.includes(data.key)
                          ? // ternary operator when user clicked on uploadedBy then their is no field named uploadedBy hence send username instead of uploadedBy
                            () =>
                              handleSort(
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
              {isLoading ? (
                <tr>
                  <td colSpan={12}>
                    <LoadingList />
                  </td>
                </tr>
              ) : (
                allBlogs?.map((blog, userIndex) => {
                  const uploadedByUser = allUsers?.find(
                    (user: User) => user.id === blog.ownerId
                  );
                  const uploadedByUserRole =
                    uploadedByUser && uploadedByUser.role;
                  const uploadedByUserId = uploadedByUser && uploadedByUser.id;
                  const uploadedByUsername =
                    uploadedByUser && uploadedByUser.username;
                  return (
                    // key={userIndex} always add at top of JSX since tr is the main parent therefore pass key={userIndex} here If we've covered it in <div> or in <></> and then tries to pass key={userIndex} in tr then we'll get the error because then div and <></> will the main parent and will be at the top of JSX
                    <tr key={userIndex}>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{userIndex + 1}</p>
                      </td>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{blog.id}</p>
                      </td>
                      {isAdmin && (
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
        {!isLoading && (
          <div className="table-footer">
            <span className="table-footer-content">
              Showing {currentPage} of
              <button
                className="text-blue-300"
                onClick={() => navigate(ROUTE_PATHS.ARTICLES_PAGE + lastPage)}
              >
                &nbsp;
                {lastPage}
              </button>
            </span>
            <div className="table-footer-container">
              {currentPage !== 1 && (
                <div>
                  <button
                    className="table-footer-actions mr-2"
                    onClick={() =>
                      navigate(
                        ROUTE_PATHS.ARTICLES_PAGE +
                          (currentPage! - 1 + window.location.search)
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
              {currentPage !== lastPage && (
                <button
                  className="table-footer-actions"
                  onClick={() =>
                    navigate(
                      ROUTE_PATHS.ARTICLES_PAGE +
                        (currentPage! + 1) +
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
      {!isLoading && !allBlogs.length && (
        <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
            {/* Oops... {isAdmin ? "No one has" : "You haven't"} uploaded any blog yet. */}
            Oops... No one has uploaded any blog yet.
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

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import qs from "query-string";
import { Link, useNavigate } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { useFiltersHook } from "utils/filters";
import { LoadingList } from "utils/loading";
import "utils/responsive.css";
import "utils/table/index.css";
import { columns, constKeys } from "./data";
import { useManageBlogsPageHooks } from "./hooks";

export default function ManageBlogsPage(): JSX.Element {
  const blogs = useBlogs();
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();
  const state = blogs.state;
  const isAdmin = hasPermission("admin", auth.state.user?.role);
  const search: any = qs.parse(window.location.search);
  let isFilter;
  if (search.sort) {
    isFilter = Object.values(JSON.parse(search.sort))[0];
  }
  const { handleSort } = useFiltersHook();

  const dataByMe = state.getMyList;
  const dataByUser = state.getBlogsList;
  const allBlogs = isAdmin ? dataByUser.data : dataByMe.data;
  const allUsers = user.state.allUser?.data;
  const currentPage = isAdmin
    ? dataByUser.meta?.currentPage
    : dataByMe.meta?.currentPage;
  const lastPage = isAdmin
    ? dataByUser.meta?.lastPage
    : dataByMe.meta?.lastPage;
  useManageBlogsPageHooks();

  const isLoading = state.getMyList.loading || state.getBlogsList.loading;

  return (
    <div className="table-main responsive">
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
      <div className="table-container">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                {columns.map((data, index: number) =>
                  // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                  // So uploaded by won't be shown when blogger clikced on manage blogs uploaded by will only be visible when admin state is true
                  data.title === "uploadedBy" && !isAdmin ? null : (
                    <th
                      className={`px-5 py-3 ${index === 0 ? '' : 'cursor-pointer'}`}
                      key={index}
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
                allBlogs?.map((blog, index: number) => {
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
                    <tr key={index}>
                      <td className="table-content">
                        <p className="whitespace-no-wrap">{index + 1}</p>
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
                        <div className="flex flex-col full:flex-row">
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
        {!isLoading && allBlogs.length && (
          <div className="table-footer">
            <span className="table-footer-content">
              Showing {currentPage} of {lastPage}
            </span>
            <div className="table-footer-container">
              {currentPage !== 1 && (
                <div>
                  <button
                    className="table-footer-actions mr-2"
                    title="First Page"
                    onClick={() => navigate(ROUTE_PATHS.ARTICLES_PAGE + 1)}
                  >
                    <KeyboardDoubleArrowLeftIcon />
                  </button>
                  <button
                    className="table-footer-actions mr-2"
                    title="Prev Page"
                    onClick={() =>
                      navigate(
                        ROUTE_PATHS.ARTICLES_PAGE +
                          (currentPage! - 1 + window.location.search)
                      )
                    }
                  >
                    <KeyboardArrowLeftIcon />
                  </button>
                </div>
              )}
              {currentPage !== lastPage && (
                <>
                  <button
                    className="table-footer-actions"
                    title="Next Page"
                    onClick={() =>
                      navigate(
                        ROUTE_PATHS.ARTICLES_PAGE +
                          (currentPage! + 1) +
                          window.location.search
                      )
                    }
                  >
                    <KeyboardArrowRightIcon />
                  </button>
                  <button
                    className="table-footer-actions"
                    title="Last page"
                    onClick={() =>
                      navigate(ROUTE_PATHS.ARTICLES_PAGE + lastPage)
                    }
                  >
                    <KeyboardDoubleArrowRightIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      {!isLoading && !allBlogs.length && (
        <div className="w-full mt-5 py-8 pl-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-lg mb-6 font-bold tracking-tight text-white">
            {/* Oops... {isAdmin ? "No one has" : "You haven't"} uploaded any blog yet. */}
            Oops...{" "}
            {auth.state.user?.role === "blogger" ? `You haven't` : `No one has`}{" "}
            uploaded any blog {!!isFilter && `related to ${isFilter} category`}.
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

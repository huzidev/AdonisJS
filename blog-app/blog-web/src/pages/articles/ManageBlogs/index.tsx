import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { useNavigate } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { columns } from "./data";
import { useManageBlogsPageHooks } from "./hooks";

export default function ManageBlogsPage() {
    const blogs = useBlogs();
  const auth = useAuth();
  const navigate = useNavigate();

  const allBlogs = blogs.state.getBlogs.data;
  const currentPage = blogs.state.getBlogs.meta?.currentPage;
  const lastPage = blogs.state.getBlogs.meta?.currentPage;

    useManageBlogsPageHooks();

    const test= "Hello World testing pagination method"
    console.log("LENGTH",  test.length);
    

    return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Manage Users</h2>
          <span className="text-xs text-gray-500">
            View accounts of registered users
          </span>
        </div>
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
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold tracking-widest text-white">
                {columns.map((data, columnIndex) => (
                  // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                  <th
                    className="px-5 py-3 cursor-pointer"
                    key={columnIndex}
                  >
                    {/* startCase will make the first letter Capital of any word */}
                    {startCase(data.title)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {allBlogs?.map((blog, userIndex) => (
                // key={userIndex} always add at top of JSX since tr is the main parent therefore pass key={userIndex} here If we've covered it in <div> or in <></> and then tries to pass key={userIndex} in tr then we'll get the error because then div and <></> will the main parent and will be at the top of JSX
                <tr key={userIndex}>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <p className="whitespace-no-wrap">{userIndex + 1}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <p className="whitespace-no-wrap">{blog.id}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <p className="whitespace-no-wrap">{blog.ownerId}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <p className="whitespace-no-wrap">{blog.title}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <p className="whitespace-no-wrap">{blog.content.length > 45
                      ? `${blog.content.slice(0, 45)}...`
                      : blog.content}</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <span className="whitespace-no-wrap">
                      {/* just show dates not time while toLocaleString shows complete date and time */}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    <span className="whitespace-no-wrap" title="Last Update">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="border-b border-gray-200 bg-white p-5 text-sm">
                    {/* <div className="pl-4"> */}
                      {/* so admin can't get the access to edit super-admin */}
                      {/* {auth.state.user &&
                      !hasPermission(, auth.state.user.role) ? (
                        <button
                          className="text-blue-600"
                          // if admin clicked on own self then redirect to EditProfile instead on EditUser
                          onClick={() =>
                            navigate(ROUTE_PATHS.VIEW_PROFILE + user.id)
                          }
                        >
                          View Profile
                        </button>
                      ) : (
                        <button
                          className="text-blue-600"
                          // if admin clicked on own self then redirect to EditProfile instead on EditUser
                          onClick={() =>
                            navigate(
                              ROUTE_PATHS.EDIT_USER +
                                (user.id === auth.state.user?.id
                                  ? "me"
                                  : user.id)
                            )
                          }
                        >
                          Edit
                        </button>
                      )}
                    </div> */}
                    <button>
                        Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            Showing {currentPage} of {lastPage}
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            {currentPage !== 1 && (
              <button
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                onClick={() =>
                  navigate(
                    ROUTE_PATHS.USERS_PAGE +
                      (currentPage! - 1 + window.location.search)
                  )
                }
              >
                Prev
              </button>
            )}
            {currentPage !== lastPage && (
              <button
                className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                onClick={() =>
                  navigate(
                    ROUTE_PATHS.USERS_PAGE +
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
      </div>
    </div>
  );
}

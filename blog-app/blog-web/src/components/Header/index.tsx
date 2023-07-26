import { Link, useLocation } from "react-router-dom";
import { useAuth } from "store/auth";
import { hasPermission } from "utils";
import { adminPaths, links, loggedInPathsBlogger, loggedInPathsUser, loggedOutPaths } from "./data";

export default function Header() {
  const location = useLocation();
  const auth = useAuth();
  const user = auth.state.user;

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <Link to="/">Blog App</Link>
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {auth.state.initState.init && links.map((data, dataIndex) =>
                // user has to be verified to access the links and if user role is "user" then not to show addBlog Page
                user && (user.role === "blogger" ? loggedInPathsBlogger.includes(data.link) : loggedInPathsUser.includes(data.link)) && user.isVerified ? (
                    <li key={dataIndex}>
                      <Link
                        to={data.link}
                        className={`
                            block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                              location.pathname === data.link
                                ? "dark:text-blue-500"
                                : "dark:text-white"
                            }
                          `}
                      >
                        {data.title}
                      </Link>
                    </li>
                ) : !user && loggedOutPaths.includes(data.link) ? (
                  <li key={dataIndex}>
                    <Link
                      to={data.link}
                      className={`
                          block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                            location.pathname === data.link
                              ? "dark:text-blue-500"
                              : "dark:text-white"
                          }
                        `}
                    >
                      {data.title}
                    </Link>
                  </li>
                  // only admin and super-admin can see Manage Users page
                ) : user && hasPermission("admin", user.role) && adminPaths.includes(data.link) && user?.isVerified && (
                  <li key={dataIndex}>
                    <Link
                      to={data.link}
                      className={`
                          block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                            location.pathname.startsWith(data.link)
                              ? "dark:text-blue-500"
                              : "dark:text-white"
                          }
                        `}
                    >
                      {data.title}
                    </Link>
                  </li>
                )
              )}
              {user && (
                <li>
                  <button
                    onClick={() => auth.signOut()}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    SignOut
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

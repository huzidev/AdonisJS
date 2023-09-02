import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { hasPermission } from "utils";
import { usePrevious } from "utils/hooks";
import { adminPaths, links, loggedInPathsBlogger, loggedInPathsUser, loggedOutPaths, managePaths } from "./data";

export default function Header(): JSX.Element {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.state.user;
  const prev = usePrevious(auth.state);
  // const value: any = managePaths.find((path) => location.pathname.includes(path));

  function signOut() {
    auth.signOut();
  }
  
   useEffect(() => {
    if (prev?.signOutState.loading) {
      if (!auth.state.signOutState.loading && !auth.state.signOutState.error) {
        navigate('/');
      }
    }
  }, [auth.state]);

  return (
    <div>
      <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            <Link to='/'>Blog App</Link>
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray text-gray-400 hover:bg-gray focus:ring-gray"
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
              {auth.state.initState.init && links.map((data, dataIndex) =>
                // user has to be verified to access the links and if user role is "user" then not to show addBlog Page
                user && (user.role === "blogger" && loggedInPathsBlogger.includes(data.link) || user.role === "user" && loggedInPathsUser.includes(data.link)) && user.isVerified ? (
                    <li key={dataIndex}>
                      <Link
                      to={managePaths.includes(data.link) ? data.link + "1" : data.link }
                        className={`
                            block py-2 pl-3 pr-4  rounded  md:border-0  md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                              location.pathname.includes(data.link)
                                ? "text-blue-500"
                                : "text-white"
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
                          block py-2 pl-3 pr-4  rounded  md:border-0  md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                            location.pathname === data.link
                              ? "text-blue-500"
                              : "text-white"
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
                    // so whem user clicked on manageUsers or manageBlogs then add 1 at end of URL which is page 1 for pagination
                      // to={!location.pathname.includes(value) ? data.link + "1" : data.link}
                      to={managePaths.includes(data.link) ? data.link + "1" : data.link }
                      className={`
                          block py-2 pl-3 pr-4  rounded  md:border-0 md:p-0 md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                            // so only clicked URL text will changed to blue which shows that user clicked OR user is on that page
                            location.pathname.includes(data.link)
                              ? "text-blue-500"
                              : "text-white"
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
                    // onClick={() => auth.signOut()}
                    onClick={signOut}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
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

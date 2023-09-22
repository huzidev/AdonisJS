import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "store/auth";
import { hasPermission } from "utils";
import 'utils/responsive.css';
import { adminPaths, links, loggedInPathsBlogger, loggedInPathsUser, loggedOutPaths, managePaths } from "./data";
import './styles.css';

export default function Header(): JSX.Element {
  const location = useLocation();
  const auth = useAuth();
  const user = auth.state.user;
  const isBanned = user?.isBanned;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }
  const [width, setWidth] = useState<number>(window.innerWidth);
  
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions) 
  }, []);
  
  return (
    <div>
      <nav className="bg-gray-900">
        <div className="responsive m-auto flex items-center justify-between mx-auto py-4">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            <Link to='/'>Blog App</Link>
          </span>
          <div
            className="space-y-2 hidden ham:block z-20 cursor-pointer"
            onClick={toggleSidebar}
          >
            <span className={`ham-menu ${isOpen ? 'rotate-45 translate-y-2.5': ''}`}></span>
            <span className={`ham-menu ${isOpen ? 'opacity-0': 'opacity-100'}`}></span>
            <span className={`ham-menu ${isOpen ? '-rotate-45 -translate-y-2.5': ''}`}></span>  
          </div>
            <ul className={`${width > 1000 ? 'font-medium flex border-gray-700' : `side-bar ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`} `}>
                  {auth.state.initState.init && links.map((data, index: number) => (
                    // user has to be verified to access the links and if user role is "user" then not to show addBlog Page
                    // so if user is banned then don't show header paths Except the SignOut path
                    !isBanned && (
                      user && (user.role === "blogger" && loggedInPathsBlogger.includes(data.link) || user.role === "user" && loggedInPathsUser.includes(data.link)) && user.isVerified ? (
                          <li key={index}>
                            <Link
                            to={managePaths.includes(data.link) ? data.link + "1" : data.link }
                              className={`
                                  nav-element  ${
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
                        <li key={index}>
                          <Link
                            to={data.link}
                            className={`
                                nav-element  ${
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
                        <li key={index}>
                          <Link
                          // so whem user clicked on manageUsers or manageBlogs then add 1 at end of URL which is page 1 for pagination
                            // to={!location.pathname.includes(value) ? data.link + "1" : data.link}
                            to={managePaths.includes(data.link) ? data.link + "1" : data.link }
                            className={`
                                nav-element  ${
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
                    )
                  ))} 
                  {user && (
                    <li>
                      <button
                        onClick={() => auth.signOut()}
                        className="block py-2 pl-3 pr-4 rounded text-white hover:bg-gray-700 hover:text-white "
                      >
                        SignOut
                      </button>
                    </li>
                  )}
                )
            </ul>
        </div>
      </nav>
    </div>
  );
}
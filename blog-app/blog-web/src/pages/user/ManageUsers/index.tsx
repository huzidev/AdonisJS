import ContactPageIcon from '@mui/icons-material/ContactPage';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ROUTE_PATHS from "Router/paths";
import startCase from "lodash/startCase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { hasPermission } from "utils";
import { useFiltersHook } from "utils/filters";
import { LoadingList } from "utils/loading";
import "utils/responsive.css";
import "utils/table/index.css";
import { columns, constKeys } from "./data";
import { useManageUsersPageHooks } from "./hooks";

export default function ManageUsersPage(): JSX.Element {
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();
  const { handleSort } = useFiltersHook();
  const [clicked, setClicked] = useState<number | null>(null);

  // so the focus will be removed when user go to next user's list page
  useEffect(() => {
    setClicked(null);
  }, [window.location.pathname]);

  const allUsers = user.state.getUserPage?.data;
  let currentPage = user.state.getUserPage.meta?.currentPage;
  let lastPage = user.state.getUserPage.meta?.lastPage;

  useManageUsersPageHooks();

  const isLoading = user.state.getUserPage.loading;

  return (
    <div className="table-main responsive">
      <div className="content">
        <div>
          <h2 className="headings-content">Manage Users</h2>
          <span className="text-content">
            View accounts of registered users
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="xs:mt-2 xxs:mt-2">
            <button
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 xs:px-3 xxs:px-3 py-2 text-sm xs:text-xs xxs:text-xs font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
              title="Create User"
              onClick={() => navigate(ROUTE_PATHS.USER_CREATE)}
            >
              <ContactPageIcon />
              Create User
            </button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              {columns.map((data, index: number) => (
                // because we don't wanna put onClick filters on sno and actions field therefore using constKeys conditions
                <th
                  onClick={
                    !constKeys.includes(data.key)
                      ? () => handleSort(data.key)
                      : undefined
                  }
                  // Not to show cursor-pointer on Sno and Actions
                  className={`px-5 py-3 ${index === 0 || data.key === 'actions' ? '' : 'cursor-pointer'}`}
                  key={index}
                >
                  {/* startCase will make the first letter Capital of any word */}
                  {startCase(data.title)}
                </th>
              ))}
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
              allUsers?.map((user, index: number) => (
                // key={index} always add at top of JSX since tr is the main parent therefore pass key={index} here If we've covered it in <div> or in <></> and then tries to pass key={index} in tr then we'll get the error because then div and <></> will the main parent and will be at the top of JSX
                <tr key={index} onClick={() => setClicked(index)} className={`${clicked === index ? 'border' : ''}`}>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">{index + 1}</p>
                  </td>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">{user.id}</p>
                  </td>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">{user.username}</p>
                  </td>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">{user.role}</p>
                  </td>
                  <td className="table-content">
                    <p className="whitespace-no-wrap">
                      {user.isVerified ? "True" : "False"}
                    </p>
                  </td>
                  <td className="table-content">
                    <span className="whitespace-no-wrap">
                      {user.isBanned ? "True" : "False"}
                    </span>
                  </td>
                  <td className="table-content">
                    <span className="whitespace-no-wrap">
                      {user.isActive ? "True" : "False"}
                    </span>
                  </td>
                  <td className="table-content">
                    <span className="whitespace-no-wrap">
                      {/* just show dates not time while toLocaleString shows complete date and time */}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="table-content">
                    <span className="whitespace-no-wrap" title="Last Update">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="table-content">
                    <div>
                      {/* so admin can't get the access to edit super-admin */}
                      {auth.state.user &&
                      !hasPermission(user.role, auth.state.user.role) ? (
                        <button
                          className="table-content-actions"
                          // if admin clicked on own self then redirect to EditProfile instead on EditUser
                          onClick={() =>
                            navigate(ROUTE_PATHS.VIEW_PROFILE + user.id)
                          }
                        >
                          View Profile
                        </button>
                      ) : (
                        <div className="flex flex-col full:flex-row">
                          <button
                            className="table-content-actions"
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
                          <button
                            className="table-content-actions"
                            // if admin clicked on own self then redirect to EditProfile instead on EditUser
                            onClick={() =>
                              navigate(
                                ROUTE_PATHS.VIEW_PROFILE +
                                  (user.id === auth.state.user?.id
                                    ? "me"
                                    : user.id)
                              )
                            }
                          >
                            &nbsp; View
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
        {
          // only show Next, Prev button when loading is completed
          !isLoading && allUsers && (
            <div className="table-footer">
              <span className="table-footer-content">
                Showing {currentPage} of {lastPage}
              </span>
              <div className="table-footer-container">
                {currentPage !== 1 && (
                  <div>
                    <button
                      title="First page"
                      className="table-footer-actions mr-2"
                      onClick={() => navigate(ROUTE_PATHS.USERS_PAGE + 1)}
                    >
                      <KeyboardDoubleArrowLeftIcon />
                    </button>
                    <button
                      title="Prev page"
                      className="table-footer-actions mr-2"
                      onClick={() =>
                        navigate(
                          ROUTE_PATHS.USERS_PAGE +
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
                      title="Next page"
                      className="table-footer-actions"
                      onClick={() =>
                        navigate(
                          ROUTE_PATHS.USERS_PAGE +
                            (currentPage! + 1) +
                            window.location.search
                        )
                      }
                    >
                      <KeyboardArrowRightIcon />
                    </button>
                    <button
                      title="Last page"
                      className="table-footer-actions"
                      onClick={() =>
                        navigate(ROUTE_PATHS.USERS_PAGE + lastPage)
                      }
                    >
                      <KeyboardDoubleArrowRightIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        }
    </div>
  );
}

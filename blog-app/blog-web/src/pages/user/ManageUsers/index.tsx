import ROUTE_PATHS from "Router/paths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { columns } from "./data";
import { useUsersPageHooks } from "./hooks";

export default function UsersPage() {
  const user = useUser();
  const auth = useAuth();
  const allUsers = user.state.allUser?.data;
  const Navigate = useNavigate();
  console.log("all users", allUsers);

  useUsersPageHooks();

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">Manage Users</h2>
          <span className="text-xs text-gray-500">
            View accounts of registered users
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="ml-10 space-x-8 lg:ml-40">
            <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
              CSV
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                {columns.map((data) => (
                  <th className="px-5 py-3">{data.title}</th>
                ))}
              </tr>
            </thead>
            {allUsers?.map((user, userIndex) => (
              <>
                <tbody className="text-gray-500">
                  <tr>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <p className="whitespace-no-wrap">{user.id}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <p className="whitespace-no-wrap">{user.username}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <p className="whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <p className="whitespace-no-wrap">
                        {user.isVerified ? "True" : "False"}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <span className="whitespace-no-wrap">
                        {user.isBanned ? "True" : "False"}
                      </span>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <span className="whitespace-no-wrap">
                        {user.isActive ? "True" : "In False"}
                      </span>
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      <div className="pl-4">
                        <button
                          className="text-blue-600"
                          // if admin clicked on own self then redirect to EditProfile instead on EditUser
                          onClick={() =>
                            Navigate(
                              ROUTE_PATHS.EDIT_USER +
                                (user.id === auth.state.user?.id
                                  ? "me"
                                  : user.id)
                            )
                          }
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
          <span className="text-xs text-gray-600 sm:text-sm">
            {" "}
            Showing 1 to 5 of 12 Entries{" "}
          </span>
          <div className="mt-2 inline-flex sm:mt-0">
            <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Prev
            </button>
            <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

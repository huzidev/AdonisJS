import ROUTE_PATHS from "Router/paths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import "utils/form/index.css";

export default function BannedUserPage(): JSX.Element {
  const auth = useAuth();
  const Navigate = useNavigate();

  async function signOut() {
    await auth.signOut();
    Navigate(ROUTE_PATHS.HOME); // Redirect to home page after signing out
  }
  return (
      <div className="dark:bg-[#181a1b] absolute top-[50%] translate-y-[-50%] w-full px-6 py-12 lg:px-8">
        <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-gray-800">
          <h1 className="text-4xl font-bold mb-6 text-white">Banned User</h1>
          <p className="text-lg text-gray-400 mb-8 ">
            Cannot process, You are banned from the web.
          </p>
          <button
            onClick={signOut}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
          >
            Sign Out
          </button>
        </div>
      </div>
  )
}

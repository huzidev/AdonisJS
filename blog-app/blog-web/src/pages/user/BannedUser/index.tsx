import ROUTE_PATHS from "Router/paths";
import { Link } from "react-router-dom";

export default function BannedUserPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6">Banned User</h1>
        <p className="text-lg text-gray-600 mb-8">
          Cannot process, You are banned from the web.
        </p>
        <Link
          to={ROUTE_PATHS.HOME}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

import ROUTE_PATHS from "Router/paths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";

export default function NotFoundPage(): JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log("auth", auth.state.isDark);
  
  return (
    <div
      className={`flex items-center justify-center h-screen ${auth.state.isDark ? 'bg-[#181a1b]' : 'bg-white'}`}
    >
      <div className="px-40 py-20 rounded-md shadow-xl bg-gray-800 border-gray-700">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-300 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>
          <p className="mb-8 text-center text-gray-400 md:text-lg">
            Sorry, the page you requested for does not exist.
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
            onClick={() => navigate(ROUTE_PATHS.ARTICLES)}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

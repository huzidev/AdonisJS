import { useNavigate } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div
    className="
        flex
        items-center
        justify-center
        w-screen
        h-screen
        bg-gradient-to-r
        from-indigo-600
        to-blue-400"
    >
      <div className="px-40 py-20 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Sorry, the page you visited does not exist.
          </p>
          <button onClick={() => navigate("/")}>
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
  const Navigate = useNavigate();
  return (
    <div
    className="
        flex
        items-center
        justify-center
        h-screen
        bg-white 
        dark:bg-gray-800 
        dark:border-gray-700
      "
    >
      <div className="px-40 py-20 rounded-md shadow-xl bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-blue-600 text-9xl">404</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Sorry, the page you visited does not exist.
          </p>
          <button 
            className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" 
            onClick={() => Navigate("/blogs")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

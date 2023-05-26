import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { useBlogsPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function Blogs(): JSX.Element {
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector((state) => state.blogs.allBlogs);
  const Navigate = useNavigate();

  console.log("all blogs", allBlogs);

  useBlogsPageHooks();
  // useEffect(() => {
  //   dispatch(getBlogs());
  // }, [])

  const fetchedData = allBlogs.map((ele: BlogState) => {
    return (
      <div key={ele.id}>
        {/* <img src={ele.image} alt="Thumbnail" /> */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt="Thumbnail"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {ele.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {ele.content}
            </p>
            {/* <Link
              to={`/${ele.custom_id}`}
              className="inline-flex items-center text-white"
            > 
              Read More
            </Link> */}
            <button
              className="text-sm font-medium text-center text-white hover:text-blue-500"
              onClick={() => console.log("custom id", ele.custom_id)}
            >
              Read More
            </button>
            <div>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => Navigate(`/update/${ele.id}`)}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => dispatch(deleteBlog(ele.id))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{fetchedData}</div>;
}

import ROUTE_PATHS from "Router/paths";
import { Link } from "react-router-dom";
import { deleteBlog } from "../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { useBlogsPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector((state) => state.blogs.allBlogs);
  const getUser = useAppSelector((state) => state.user.getUser);

  useBlogsPageHooks();

  const ownerId = {

  }

  const fetchedData = allBlogs.map((ele: BlogState) => {
    return (
      <div 
        key={ele.id}
      >
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
              {ele.content.length > 38 ? `${ele.content.slice(0, 38)}...` : ele.content}
            </p>
            <Link
              to={`/blog/${ele.slug}`}
              className="text-sm font-medium text-center text-white hover:text-blue-500"
            > 
              Read More
            </Link>
            {
              ele.ownerId === 4 ? (
              <div>
                <Link
                  to={ROUTE_PATHS.ARTICLE_UPDATE + ele.slug}
                  type="button"
                  className="text-white bg-gray-800 font-medium text-sm py-2.5"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-white bg-gray-800 font-medium text-sm ml-4 py-2.5"
                  onClick={() => dispatch(deleteBlog(ele.id))}
                >
                  Delete
                </button>
              </div>
              ) : ''
            }
            
          </div>
        </div>
      </div>
    );
  });
  return (
  <div 
    className="flex flex-wrap"
    >
    {fetchedData}
    </div>
  )
}

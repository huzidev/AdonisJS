import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { useBlogsPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function Blogs(): JSX.Element {
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector((state) => state.blogs.allBlogs);
  const Navigate = useNavigate();

  useBlogsPageHooks();
  // useEffect(() => {
  //   dispatch(getBlogs());
  // }, [])

  const fetchedData = allBlogs.map((ele: BlogState) => {
    return (
      <div key={ele.id}>
        {/* <img src={ele.image} alt="Thumbnail" /> */}
        <h3>Text: {ele.content}</h3>
        <button onClick={() => Navigate(`/update/${ele.id}`)}>Edit</button>
        <button onClick={() => dispatch(deleteBlog(ele.id))}>Delete</button>
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
            <a
              href="#"
              className="inline-flex items-center text-white"
            > 
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  });
  return <div>{fetchedData}</div>;
}

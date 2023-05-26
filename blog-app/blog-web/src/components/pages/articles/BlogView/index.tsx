import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";

export default function BlogView(): JSX.Element {
  const params = useParams();
  const allBlogs = useAppSelector((state) => state.blogs.getBlog);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getBlog(Number(params.id)))
  // }, [])

  // const { title, content } = allBlogs;

  return (
    <div>
        Blog
        <div 
        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt="Thumbnail"
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Title
            </h5> 
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Message
            </p>
          </div>
        </div>
    </div>
  )
}

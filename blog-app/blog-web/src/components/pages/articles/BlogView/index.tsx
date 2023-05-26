import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";

export default function BlogView(): JSX.Element {
  const params = useParams();
  const allBlogs = useAppSelector((state) => state.blogs.getBlog);
  const dispatch = useAppDispatch();

  const initialState: ArticleType = {title: "", image: "", content: ""};

  const [blog, setBlog] = useState({})

  // for (let key in allBlogs) {
  //   const data : any = allBlogs[key]    
  //   console.log(data);
  // }

  allBlogs.
  

  const slug: string | undefined = params.slug;

  useEffect(() => {
    dispatch(getBlog(slug!))
  }, [])



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

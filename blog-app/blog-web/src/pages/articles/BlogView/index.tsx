import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks/hooks";
import { useGetBlogPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogPage(): JSX.Element {
  const getBlog = useAppSelector((state) => state.blogs.getBlog);
  useGetBlogPageHooks();

  const initialState: BlogState = {title: "", image: "", content: ""};
  const [blog, setBlog] = useState(initialState)

  useEffect(() => {
    setBlog({...blog, ...getBlog})
  }, [getBlog])

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
              {blog.title}
            </h5> 
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blog.content}
            </p>
          </div>
        </div>
    </div>
  )
}

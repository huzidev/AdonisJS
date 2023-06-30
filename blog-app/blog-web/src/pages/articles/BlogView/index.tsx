import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useGetBlogPageHooks } from "./hooks";
import { BlogState } from "./types";

export default function ViewBlogPage(): JSX.Element {
  const blogs = useBlogs();
  const getBlog = blogs.state.getBlog?.data
  const initialState: BlogState = {title: "", image: "", content: ""};
  const [blogView, setBlogView] = useState(initialState);

  useGetBlogPageHooks();

  useEffect(() => {
    setBlogView({...blogView, ...getBlog})
  }, [getBlog])
  
  return (
    <div>
        <div 
          className="w-2/3 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg"
            src="/docs/images/blog/image-1.jpg"
            alt="Thumbnail"
          />
          <div className="p-5 flex flex-col items-center">
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blogView.title}
            </h5> 
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blogView.content}
            </p>
          </div>
        </div>
    </div>
  )
}

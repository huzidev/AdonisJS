import ROUTE_PATHS from "Router/paths";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { BlogState } from "./types";

export default function ViewBlogsPage(): JSX.Element {
  const blogs = useBlogs();
  const auth = useAuth()
  const allBlogs = blogs.state.getBlogs?.data;
  const userId = auth.state.user?.id;

  useEffect(() => {
    blogs.getBlogs()
  }, [])

  return (
  <div 
    className="w-10/12 m-auto flex flex-wrap"
  >
    {
      allBlogs!.map((blog: BlogState) => {
          return (
            <div 
              key={blog.id}
              className="w-[30.33%] mt-8 mx-4"
            >
              {/* <img src={ele.image} alt="Thumbnail" /> */}
              <div className="h-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg"
                  src="/docs/images/blog/image-1.jpg"
                  alt="Thumbnail"
                />
                <div className="p-5">
                  <h5 title={blog.title} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title.length > 21 ? `${blog.title.slice(0, 21)}...` : blog.title }
                  </h5> 
                  <p title={blog.content} className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {blog.content.length > 60 ? `${blog.content.slice(0, 60)}...` : blog.content}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-sm font-medium text-center text-white hover:text-blue-500"
                  > 
                    Read More
                  </Link>
                  {
                    blog.ownerId === userId && (
                    <div>
                      <Link
                        to={ROUTE_PATHS.ARTICLE_UPDATE + blog.slug}
                        type="button"
                        className="text-white bg-gray-800 font-medium text-sm py-2.5"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="text-white bg-gray-800 font-medium text-sm ml-4 py-2.5"
                        onClick={() => blogs.deleteBlog(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                    )
                  }
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  )
}

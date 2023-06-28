import ROUTE_PATHS from "Router/paths";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { UserDetailState } from "./types";

export default function ViewProfilePage() {
  const auth = useAuth();
  const blogs = useBlogs();
  const data = auth.state.user;
  const [userDetails, setUserDetails] = useState<UserDetailState>({ 
    username: "", email: "", createdAt: ""
  })
  const formatedDate = new Date(userDetails.createdAt).toLocaleString();
  const isLoading = blogs.state.getBlogs?.loading;
  const userId = auth.state.user?.id;

  useEffect(() => {
    blogs.getBlogs()
    setUserDetails({...userDetails, ...data})
  }, [])

  let blogById = blogs.state.getBlogs?.data; 
  let idBlog = blogById.filter((blogs) => blogs.ownerId === userId)

  return (
    <div>
      <div 
          className="w-11/12 my-8 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <h1 className="mb-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              User Profile
            </h1>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Name : {userDetails.username}
            </h2> 
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Email : {userDetails.email}
            </h2> 
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Joined Date : {formatedDate}
            </h2> 
            <h2 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Blogs : {idBlog.length}
            </h2> 
            <Link
              to="/user/edit/me"
              type="button"
              className="text-white bg-gray-800 font-medium text-sm py-2.5"
            >
              Edit
            </Link>
          </div>
        </div>
        <div 
    className="w-10/12 m-auto flex flex-wrap"
  > 
    {idBlog.length ? (
      idBlog!.map((blog: any) => {
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
                    {blog.content.length > 50 ? `${blog.content.slice(0, 50)}...` : blog.content}
                  </p>
                  <Link
                    to={ROUTE_PATHS.ARTICLE_VIEW + blog.slug}
                    className="text-sm font-medium text-center text-white hover:text-blue-500"
                  > 
                    Read More
                  </Link>
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
                </div>
              </div>
            </div>
          );
        })) : !idBlog.length && !isLoading ? "You Haven't uploaded Any Blog Yet" : ""
        }
    </div>
    </div>
  )
}
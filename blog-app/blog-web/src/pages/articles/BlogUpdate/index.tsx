import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "store/articles";
import { ArticleType } from "./types";

export default function UpdateBlogPage(): JSX.Element {
  const blogs = useBlogs();
  const params = useParams();
  const slug: any = params.slug;
  const blog = blogs.state.getBlog?.data;
  const initialState: ArticleType = {
    id: null,
    title: "",
    image: "",
    content: "",
  };
  const [updateArticle, setUpdateArticle] = useState(initialState);
  
  const { id, title, image, content } = updateArticle;
  
  useEffect(() => {
    blogs.getBlog(slug)
  }, [])
  
  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateArticle({
      ...updateArticle,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setUpdateArticle({ ...updateArticle, ...blog });
  }, [blog]);

  function update() {
    if (title === "" || content === "" || image === "") {
      alert("You can't left a field empty")
    } else {
      blogs.updateBlog({
        ...updateArticle,
        id
      })
    }
  }
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Yours Blog
          </h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Blog Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                value={title}
                type="text"
                required
                onChange={inputHandler}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* <div className="mb-3">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <input
              type="file" 
              name="image" 
              onChange={inputHandler}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
            />
          </div> */}
          <div className="mb-6">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  name="content"
                  cols={30}
                  rows={10}
                  value={content}
                  onChange={inputHandler}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={update}
            >
              Update Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useBlogs } from "store/articles";
import { useCreateBlogPageHooks } from "./hooks";
import { ArticleType } from "./types";

export default function AddBlogPage(): JSX.Element {
  const blog = useBlogs();
  const initialState: ArticleType = { title: "", image: "", content: "" };
  const [article, setArticle] = useState(initialState);
  const { title, image, content } = article;

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    blog.addBlog(article)
  }
  
  useCreateBlogPageHooks();
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Add Blog
          </h2>
        </div>
        <form onSubmit={submit} className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mb-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Blog Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                required
                minLength={6}
                onChange={inputHandler}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:bg-gray-800"
                placeholder="Write your blog title here..."
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Image
            </label>
            <input
              type="file"
              name="image"
              required
              onChange={inputHandler}
              value={image}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mb-6">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  name="content"
                  value={content}
                  cols={30}
                  rows={10}
                  required
                  onChange={inputHandler}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:bg-gray-800"
                  placeholder="Write yours blog content here..."
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <input 
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit" 
              value="Add Blog"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

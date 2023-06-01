import { useState } from "react";
import { addBlog } from "store/articles/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { ArticleType } from "./types";

export default function AddBlogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const initialState: ArticleType = {title: "", image: "", content: ""};
  const [article, setArticle] = useState(initialState);
  const { title, image, content } = article;

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    });
  };

  function createBlog() {
    dispatch(addBlog(article))
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
          Add Blog
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
                type="text"
                value={title}
                required
                onChange={inputHandler}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write your blog title here..."
              />
            </div>
          </div>
          <div className="mb-3">
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
              value={image} 
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" 
            />
          </div>
          <div className="mb-6">
            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <textarea 
                  name="content" 
                  value={content}
                  cols={30} 
                  rows={10} 
                  onChange={inputHandler}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  placeholder="Write your blog content here..."
                  ></textarea>
                </div>
            </div>
          </div>
          <div>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={createBlog}
            >
              Add Blog
            </button>
          </div>
      </div>
    </div>
        <h1>
            Add blog
        </h1>
          <input 
            type="text" 
            name="title" 
            value={title}
            onChange={inputHandler}
            placeholder="Article's Title"
            />
          <input 
            type="file" 
            name="image" 
            onChange={inputHandler}
            value={image} 
            />
          <textarea 
            name="content" 
            value={content} 
            onChange={inputHandler}
            id="" 
            cols={30} 
            rows={10} 
            placeholder="Enter Yours Text Here">
          </textarea>
          <button onClick={createBlog}>
            Add Blog
          </button>
    </div>
  )
}

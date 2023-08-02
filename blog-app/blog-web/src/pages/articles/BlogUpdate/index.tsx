import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import { LoadingList, LoadingThreeDots } from "utils/loading";
import { updateBlogData } from "./data";
import { useEditBlogPageHooks } from "./hooks";

export default function UpdateBlogPage(): JSX.Element {
  const auth = useAuth();
  const user = useUser();
  const blogs = useBlogs();
  const blog = blogs.state.getBlog?.data;
  // when admin Clikced on edit blog then check if ownerId of that blog is mathcing the loggedIn user id if it matches then we'll show Edit Yours Blog other wise
  // admin is updating blog hence it'll show edit (ownername of blog) blog
  const isOwner = auth.state.user?.id === blogs.state.getBlog.data?.ownerId ? true : false;
  const ownerName = user.state.getUser.data?.username;
  const [updateArticle, setUpdateArticle] = useState(updateBlogData);
  const [prevState, setPrevState] = useState(updateBlogData);
  const { id, title, image, content } = updateArticle;

  useEditBlogPageHooks();

  const isLoading = user.state.getUser.loading;
  const isLoadingBlog = blogs.state.getBlog.loading;

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUpdateArticle({
      ...updateArticle,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setUpdateArticle({ ...updateArticle, ...blog });
    setPrevState({ ...prevState, ...blog });
  }, [blog]);

  function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    blogs.updateBlog({
      ...updateArticle,
      id
    });
  }

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {/* show skeleton loading when blogs is in loading state */}
        {isLoadingBlog ? (
          <LoadingList />
        ) : (
          <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              {/* show three dots loading when users data is in loading state */}
              {isLoading
                ? <LoadingThreeDots />
                : `Edit ${isOwner ? "Yours" : `${ownerName}'s`} Blog`
              }
            </h2>
          </div>
          <form
            onSubmit={update}
            className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm"
          >
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
                  minLength={6}
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
                    required
                    onChange={inputHandler}
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <input
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                value="Update Blog"
              />
            </div>
          </form>
        </div>
        )}
        </div>
    </div>
  );
}

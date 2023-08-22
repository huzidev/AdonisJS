import { useEffect, useState } from "react";
import { useBlogs } from "store/articles";
import { useAuth } from "store/auth";
import { useUser } from "store/user";
import 'utils/form/index.css';
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
      <div className="main">
        {/* show skeleton loading when blogs is in loading state */}
        {isLoadingBlog ? (
          <LoadingList />
        ) : (
          <div>
          <div className="form">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="main-heading-content">
              {/* show three dots loading when users data is in loading state */}
              {isLoading
                ? <LoadingThreeDots />
                : `Edit ${isOwner ? "Yours" : `${ownerName}'s`} Blog`
              }
            </h2>
          </div>
          <form
            onSubmit={update}
            className="form mt-6"
          >
            <div className="mb-3">
              <label
                htmlFor="title"
                className="form-heading"
              >
                Blog Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  value={title}
                  type="text"
                  placeholder={`Edit ${isOwner ? "Yours" : `${ownerName}'s`} Blog title`}
                  required
                  minLength={6}
                  onChange={inputHandler}
                  className="form-input"
                />
              </div>
            </div>
            {/* <div className="mb-3">
              <label
                htmlFor="image"
                className="form-heading"
              >
                Image
              </label>
              <input
                type="file" 
                name="image" 
                onChange={inputHandler}
                className="form-input" 
              />
            </div> */}
            <div className="mb-6">
              <div>
                <label
                  htmlFor="content"
                  className="form-heading"
                >
                  Content
                </label>
                <div className="mt-2">
                  <textarea
                    name="content"
                    cols={30}
                    rows={10}
                    value={content}
                    placeholder={`Edit ${isOwner ? "Yours" : `${ownerName}'s`} Blog content`}
                    required
                    onChange={inputHandler}
                    className="form-input"
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <input
                className="form-action cursor-pointer"
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

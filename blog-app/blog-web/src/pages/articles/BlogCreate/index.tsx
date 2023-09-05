import { useState } from "react";
import { useBlogs } from "store/articles";
import { categories } from "store/articles/types";
import "utils/form/index.css";
import { useCreateBlogPageHooks } from "./hooks";
import { ArticleType } from "./types";

export default function AddBlogPage(): JSX.Element {
  const blog = useBlogs();
  const initialState: ArticleType = { title: '', image: '', content: '', catergory: '' };
  const [article, setArticle] = useState(initialState);
  const { title, image, content } = article;

  function inputHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    blog.addBlog(article);
  }

  useCreateBlogPageHooks();
  return (
    <div>
      <div className="main">
        <div className="form">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="main-heading-content">Add Blog</h2>
        </div>
        <form onSubmit={submit} className="form mt-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-heading">
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
                className="form-input"
                placeholder="Write your blog title here..."
              />
            </div>
          </div>
          <div className="mb-3">
            <div className="mt-2">
              <label htmlFor="catergories" className="form-heading mt-2">
                Roles for blog
              </label>
              <select
                id="catergories"
                name="catergory"
                value={article.catergory}
                onChange={inputHandler}
                className="form-input cursor-pointer"
                required
              >
                {categories.map((category, index: number) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-heading mb-2">
              Image
            </label>
            <input
              type="file"
              name="image"
              required
              onChange={inputHandler}
              value={image}
              className="form-input cursor-pointer"
            />
          </div>
          <div className="mb-6">
            <div>
              <label htmlFor="content" className="form-heading">
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
                  className="form-input"
                  placeholder="Write yours blog content here..."
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <input className="form-action" type="submit" value="Add Blog" />
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { addBlog } from "../../../../store/articles/actions";
import { useAppDispatch } from "../../../../store/hooks/hooks";
import { ArticleType } from "./types";

export default function Form(): JSX.Element {
  const dispatch = useAppDispatch();
  const initialState: ArticleType = {title: "", image: "", content: ""};

  const [article, setArticle] = useState(initialState)

  const { title, image, content } = article;

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    });
  };

  async function add() {
    dispatch(addBlog(article));
  }

  return (
    <div>
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
            id="" cols={30} 
            rows={10} 
            placeholder="Enter Yours Text Here">
          </textarea>
          <button onClick={add}>
            Add Blog
          </button>
    </div>
  )
}

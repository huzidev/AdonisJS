import { useState } from "react";
import { ArticleType } from "./types";

export default function Form(): JSX.Element {
  const initialState: ArticleType = {title: "", image: "", content: ""};

  const [article, setArticle] = useState(initialState)

  const { title, image, content } = article;

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    });
  };

   var data: ArticleType = {
      title,
      image,
      content
  };

  const config = {
    method: 'post',
    url: "http://127.0.0.1:3333/add_article",
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }

  async function addBlog() {
    
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
          <button onClick={addBlog}>
            Add Blog
          </button>
    </div>
  )
}

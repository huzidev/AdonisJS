import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleType } from "./types";

export default function Update(): JSX.Element {
  const initialState: ArticleType = {title: "", image: "", content: ""};
  const params = useParams();
  const Navigate = useNavigate();

  const [updateArticle, setUpdateArticle] = useState(initialState)

  const id = params.id;

  const { title, image, content } = updateArticle;

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateArticle({
      ...updateArticle,
      [e.target.name]: e.target.value
    });
  };

   var data: ArticleType = {
      title,
      image,
      content
  };

  const config = {
    method: 'get',
    url: `http://127.0.0.1:3333/article/${id}`,
    headers: {
        'Content-Type': 'application/json'
    }
  }
  
  async function getSingleBlog() {
    try {
      const response: any = await axios(config);
      setUpdateArticle({
        title: response.data.data.title,
        image,
        content: response.data.data.content
      })
    } catch (e) {
      console.log("Error", e);
    }
  }
  
  useEffect(() => {
    getSingleBlog()
  }, [])

  const updateConfig = {
    method: 'put',
    url: `http://127.0.0.1:3333/article/edit/${id}`,
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }

  async function updateBlog() {
    try {
      const response = await axios(updateConfig);
      if (response) {
        alert("Blog updated");
        Navigate("/blogs");
      }
    } catch (e) {
      console.log("Error");
    }
  }

  return (
    <div> 
        <h1>
            Update Blog
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
          <button onClick={updateBlog}>
            Update Blog
          </button>
    </div>
  )
}

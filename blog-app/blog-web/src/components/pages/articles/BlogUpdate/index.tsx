import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog, updateBlog } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { ArticleType } from "./types";

export default function Update(): JSX.Element {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((s) => s.blogs.getBlog);
  const initialState: ArticleType = {title: "", image: "", content: ""};
  const params = useParams();
  const Navigate = useNavigate();

  const [updateArticle, setUpdateArticle] = useState(initialState)

  const id = Number(params.id);

  const { title, image, content } = updateArticle;

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateArticle({
      ...updateArticle,
      [e.target.name]: e.target.value
    });
  };

  //  var data: ArticleType = {
  //     title,
  //     image,
  //     content
  // };

  // const config = {
  //   method: 'get',
  //   url: `http://127.0.0.1:3333/article/${id}`,
  //   headers: {
  //       'Content-Type': 'application/json'
  //   }
  // }
  
  // async function getSingleBlog() {
  //   try {
  //     const response: any = await axios(config);
  //     setUpdateArticle({
  //       title: response.data.data.title,
  //       image,
  //       content: response.data.data.content
  //     })
  //   } catch (e) {
  //     console.log("Error", e);
  //   }
  // }
  
  useEffect(() => {
    getSingleBlog()
  }, [])

  async function update() {
    dispatch(updateBlog({
      ...updateArticle, 
      id
    }));
  }

  function getSingleBlog() {
    dispatch(getBlog(id))
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
          <button onClick={update}>
            Update Blog
          </button>
          <button onClick={getSingleBlog}>
            Get Blog
          </button>
    </div>
  )
}

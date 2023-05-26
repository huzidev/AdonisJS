import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog, updateBlog } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { ArticleType } from "./types";

export default function Update(): JSX.Element {
  const dispatch = useAppDispatch();
  const blog = useAppSelector((s) => s.blogs.getBlog);
  const params = useParams();

  const slug: string | undefined = params.slug;

  const initialState: ArticleType = {id: null, title: "", image: "", content: ""};
  const [updateArticle, setUpdateArticle] = useState(initialState);

  const { id, title, image, content } = updateArticle;

  console.log("id", id);

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUpdateArticle({
      ...updateArticle,
      [e.target.name]: e.target.value
    });
  };
  
  useEffect(() => {
    dispatch(getBlog(slug!))
  }, [])

  useEffect(() => {
    setUpdateArticle({...updateArticle, ...blog})
  }, [blog])

  async function update() {
    dispatch(updateBlog({
      ...updateArticle, 
      id
    }));
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
          {/* <input 
            type="file" 
            name="image" 
            onChange={inputHandler}
            value={image} 
            /> */}
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
    </div>
  )
}

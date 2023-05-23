import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";

export default function Blogs(): JSX.Element {
  const dispatch = useAppDispatch();
  const allBlogs: any = useAppSelector(state => state.blogs.allBlogs);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogs());
  }, [])

  async function deleteBlog(id: number) {
    const config = {
      method: 'delete',
      url: `http://127.0.0.1:3333/article/delete/${id}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios(config);
    alert("Blog deleted successfully");
  }
  
  const fetchedData = allBlogs.map((ele: any) => {
    return (
      <div key={ele.id}>
        <h1>
          ID: {ele.id}
        </h1>
        {/* <img src={ele.image} alt="Thumbnail" /> */}
        <h2>
          Title : {ele.title}
        </h2>
        <h3>
          Text: {ele.content}
        </h3>
        <button onClick={() => Navigate(`/update/${ele.id}`)}>
          Edit
        </button>
        <button onClick={() => deleteBlog(ele.id)}>
          Delete
        </button>
      </div>
    )
  })

  return (
    <div>
      {fetchedData}
    </div>
  )
}

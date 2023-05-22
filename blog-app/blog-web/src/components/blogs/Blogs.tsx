import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blogs(): JSX.Element {

  const Navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    const response = await fetch("http://127.0.0.1:3333/articles");
    const result = await response.json();
    console.log("Result", result.data);
    setBlogs(result.data);
  }
  
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
  
  useEffect(() => {
    getBlogs();
  }, [deleteBlog])
  
  const fetchedData = blogs.map((ele: any) => {
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

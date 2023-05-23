import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getBlog, getBlogs } from "../../../../store/articles/actions";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { BlogState } from "./types";

export default function Blogs(): JSX.Element {
  const dispatch = useAppDispatch();
  const allBlogs = useAppSelector(state => state.blogs.allBlogs);
  const Navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogs());
  }, [])

  const fetchedData = allBlogs.map((ele: BlogState) => {
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
        <button onClick={() => dispatch(getBlog(ele.id))}>
          Edit
        </button>
        <button onClick={() => dispatch(deleteBlog(ele.id))}>
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

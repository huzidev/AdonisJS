import { useState } from "react";

export default function App(): JSX.Element {

  const [blogs, setBlogs] = useState([]);

  async function test() {
    const response= await fetch("http://127.0.0.1:3333/articles");
    const result = await response.json();
    console.log("Result", result.data);
    setBlogs(result.data);
  }

  const fetchedData = blogs.map((ele: any) => {
    return (
      <>
        <h1>
          ID: {ele.id}
        </h1>
        <h2>
          Title : {ele.title}
        </h2>
        <h3>
          Text: {ele.content}
        </h3>
      </>
    )
  })

  return (
    <div>
      <button onClick={test}>
        Get Data
      </button>
      {fetchedData}
    </div>
  )
}

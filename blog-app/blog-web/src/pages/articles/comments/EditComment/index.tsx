import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useComments } from "store/comment";

export default function EditCommentPage(): JSX.Element {
  const comment = useComments();
  const params: any = useParams();
  const commentResp = comment.state.getCommentById.data;
  console.log("Comment resp", commentResp);
  const [content, setContent] = useState<any>();

  useEffect(() => {
    comment.getById(params.id);
    setContent({ ...content, commentResp });
  }, []);

  return (
    <>
      <label
        htmlFor="username"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Username
      </label>
      <div className="mt-2">
        <input
          id="username"
          name="username"
          type="text"
          value={content}
          onChange={(e) => e.target.value}
          required
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
          value="Update Details"
        />
      </div>
    </>
  );
}

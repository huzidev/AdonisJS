import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useComments } from "store/comment";
import { useEditCommentPageHooks } from "./hooks";

export default function EditCommentPage(): JSX.Element {
  const comment = useComments();
  const params: any = useParams();
  const commentResp = comment.state.getCommentById.data;
  const [content, setContent] = useState<any>({comment: ''});
  const navigate = useNavigate();
  
  useEffect(() => {
    if (commentResp) {
        setContent({ ...content, ...commentResp })
    }
  }, [params.id, commentResp])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.editComment({ id: params.id, comment: content });
    navigate(-1);
  }

  useEditCommentPageHooks();

  return (
    <>
    <form onSubmit={submit} className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Edit Comment
      </label>
      <div className="mt-2">
        <input
          id="comment"
          name="comment"
          type="text"
          value={content.comment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
          value="Update Comment"
        />
      </div>
    </form>
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useComment } from "store/comment";
import { useEditCommentPageHooks } from "./hooks";
import { EditCommentPayload } from "./types";

export default function EditCommentPage({ commentV, commentId, userId } : any): JSX.Element {
  const comment = useComment();
  const params: any = useParams();
  const commentResp = comment.state.getCommentById.data;
  const [editComment, setEditComment] = useState<EditCommentPayload>({ 
    id: commentId,
    content: '', 
    userId
  });
  
  useEffect(() => {
    if (commentResp) {
      setEditComment({ ...editComment, content: commentResp.content })
    }
  }, [params.id, commentResp])
 
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.editComment(editComment);
  }
  useEditCommentPageHooks();

  return (
    <>
    <form onSubmit={submit}>
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Edit Comment
      </label>
      <div className="mt-2">
        <input
          id="content"
          name="content"
          type="text"
          placeholder="Edit Comment"
          value={commentV}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditComment({...editComment, content: e.target.value})}
          required
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white"
        />
        <div className="flex">
          <button 
            className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
          <input
            className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value="Update Comment"
          />
        </div>
      </div>
    </form>
    </>
  );
}

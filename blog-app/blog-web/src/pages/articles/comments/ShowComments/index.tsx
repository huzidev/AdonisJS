import { useState } from "react";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComment } from "store/comment";
import { hasPermission } from "utils";
import { AllCommentsState } from "../AddComment/types";
import { EditCommentPayload, ReplyState } from "./types";

export default function ShowCommentsPage({
  comment,
  allUsers,
  allReplies,
  isBlogOwner,
  blogId,
  replyState,
  setReplyState,
  dropDown,
  setDropDown,
  editState, 
  setEditState,
}: any) {
  const commentHook = useComment();
  const auth = useAuth();
  const userData: any = auth.state.user;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<EditCommentPayload>({
    id: null,
    userId: null,
    content: "",
  });

  const uploadedByUser = allUsers.find(
    (user: User) => user.id === comment.userId
  );

  const [reply, setReply] = useState<ReplyState>({
    userId: userData?.id,
    articleId: blogId,
    parentId: comment.id,
    content: "",
  });

  const isCommentAuthor = comment.userId === userData?.id;
  const uploadedByUserRole = uploadedByUser?.role;
  const isAuthorSuperAdmin = uploadedByUserRole === "super-admin";
  const commentBy = uploadedByUser?.username;

  const replies =
    allReplies &&
    allReplies.filter(
      (reply: AllCommentsState) => reply.parentId === comment.id
    );

  const isAuthorAdmin = uploadedByUserRole === "admin";
  const isSuperAdmin = auth.state.user?.role === "super-admin";
  const isAdmin = hasPermission("admin", userData?.role);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEdit) {
      commentHook.editComment(editState);
    } else {
      commentHook.addComment({ ...reply });
      setReply({ ...reply, content: "" });
      setReplyState(null);
    }
  }

  return (
    <div>
      <div className="flex">
        <p className="inline-flex text-lg items-center mr-3  text-white">
          - {commentBy} {uploadedByUserRole === "super-admin" && "*"}{" "}
        </p>
        <p className="text-white">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
        {/* three dots button will only be visible when user is loggedIn or if loggedIn user is admin and comment/reply author is super-admin then don't show three dots */}
        {userData &&
          (isCommentAuthor ||
            (isAdmin && !isAuthorSuperAdmin) ||
            (isBlogOwner && !isAuthorAdmin && !isAuthorSuperAdmin) ||
            // isSuperAdmin when super-admin is loggedIn then show three dots for all users even if some other super-admin has comment then show three dots for that comment as well
            isSuperAdmin) && (
            <button
              id="dropdownComment1Button"
              data-dropdown-toggle="dropdownComment1"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 bg-gray-900"
              type="button"
              // when user clicked on three-dots drop-down first then add comment.id in it and when user clicked again on three-dots drop-down then add null so three-dots drop-down get hidden
              onClick={() =>
                setDropDown(dropDown === comment.id ? null : comment.id)
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
              <span className="sr-only">Comment settings</span>
            </button>
          )}
        <div
          id="dropdownComment1"
          className={`${
            dropDown === comment.id ? "block" : "hidden"
          } z-10 w-36 rounded divide-y shadow bg-gray-700 divide-gray-600`}
        >
          <ul
            className="py-1 text-sm  text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              {(isCommentAuthor ||
                (isAdmin && !isAuthorSuperAdmin) ||
                isSuperAdmin) && (
                // <Link
                //   to={ROUTE_PATHS.EDIT_COMMENT + comment.id}
                //   className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:text-white"
                // >
                //   Edit
                // </Link>
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setEditState(comment.id);
                    setEditComment({
                      ...editComment,
                      id: comment.id,
                      userId: comment.userId,
                      content: comment.content
                    });
                  }}
                >
                  Edit
                </button>
              )}
            </li>
            <li>
              {/* // means if admin is loggedIn or Blog's owner is loggedIn then show delete button BUT not on super-admins and admins comment */}
              {(isCommentAuthor ||
                (isAdmin && !isAuthorSuperAdmin) ||
                (isBlogOwner && !isAuthorAdmin && !isAuthorSuperAdmin) ||
                isSuperAdmin) && (
                <button
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:text-white"
                  onClick={() => commentHook.deleteComment(comment.id)}
                >
                  Delete
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* when user clicked on edit then it'll show input field with value of comment else it'll just show the comment */}
      {editState === comment.id ? (
        // <EditCommentPage
        //   commentV={comment.content}
        //   commentId={comment.id}
        //   userId={comment.userId}
        //   setEditState={setEditState}
        // />
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
                value={editComment.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditComment({ ...editComment, content: e.target.value })
                }
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white"
              />
              <div className="flex">
                <button
                  className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setEditState(null)}
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
      ) : (
        <p className="text-gray-400 ml-6">{comment.content}</p>
      )}
      <div>
        {/* so reply input will only be shown for those comment on which user clicked for reply otherwise due to map reply field will be shown to every comments */}
        {replyState === comment.id ? (
          <form onSubmit={submit} className="mt-2">
            <input
              id="reply"
              name="reply"
              type="text"
              value={reply.content}
              // so if user is replying to owns comment then show reply yours comment
              placeholder={`Reply to ${
                isCommentAuthor ? "Yours" : commentBy + `'s`
                // when user is replying to a reply then show Reply to yours/username reply else Reply to yours/username comment
              } ${comment.parentId ? "reply" : "comment"}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReply({ ...reply, content: e.target.value })
              }
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-white bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="flex">
              <button
                className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setReplyState(null)}
              >
                Cancel
              </button>
              <input
                className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                value="reply"
              />
            </div>
          </form>
        ) : (
          // reply button wouldn't be shown when user has clicked on reply button
          <button
            className="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 focus:ring-green-800"
            onClick={() => setReplyState(comment.id)}
          >
            Reply
          </button>
        )}
      </div>
      {replies.map((reply: AllCommentsState) => (
        <div key={reply.id} className="ml-10">
          <div>
            {/* calling <ShowCommentsPage /> component within it self called Recursion */}
            {/* because of recursion we've to pass the props agin in ShowCommentsPage */}
            <ShowCommentsPage
              comment={reply}
              allUsers={allUsers}
              allReplies={allReplies}
              replyState={replyState}
              setReplyState={setReplyState}
              dropDown={dropDown}
              blogId={blogId}
              setDropDown={setDropDown}
              editState={editState}
              setEditState={setEditState}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

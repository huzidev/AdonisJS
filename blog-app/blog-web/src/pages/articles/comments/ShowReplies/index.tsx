import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComment } from "store/comment";
import { hasPermission } from "utils";
import { AllCommentsState } from "../ShowComments/types";

export default function CommentWithReplies({
  comment,
  allUsers,
  allReplies,
  isBlogOwner,
  blogId
}: any) {
  const commentFunc = useComment();
  const auth = useAuth();
  const userData = auth.state.user;
  const [replyState, setReplyState] = useState<any>({
    id: null,
  });
  const uploadedByUser = allUsers.find(
    (user: User) => user.id === comment.userId
  );
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [reply, setReply] = useState<any>({
    userId: null,
    articleId: null,
    parentId: null,
    content: ''
  });
  const isCommentAuthor = comment.userId === userData?.id;
  const isAuthorSuperAdmin = uploadedByUser === "super-admin";
  const commentBy = uploadedByUser?.username;
  const uploadedByUserRole = uploadedByUser?.role;
  const replies =
    allReplies &&
    allReplies.filter(
      (reply: AllCommentsState) => reply.parentId === comment.id
    );

  const isAuthorAdmin = uploadedByUserRole === "admin";
  const isAdmin = hasPermission("admin", userData?.role);
  return (
    <div>
      <div className="flex">
        <p className="inline-flex text-lg items-center mr-3 text-gray-900 dark:text-white">
          - {commentBy} {uploadedByUserRole === "super-admin" && "*"}{" "}
        </p>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        <button
          id="dropdownComment1Button"
          data-dropdown-toggle="dropdownComment1"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
          onClick={() => setDropDown(!dropDown)}
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
        <div
          id="dropdownComment1"
          className={`${
            dropDown ? "block" : "hidden"
          } z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              {(isCommentAuthor || (isAdmin && !isAuthorSuperAdmin)) && (
                <Link
                  to={ROUTE_PATHS.EDIT_COMMENT + comment.id}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </Link>
              )}
            </li>
            <li>
              {/* // means if admin is loggedIn or Blog's owner is loggedIn then show delete button BUT not on super-admins and admins comment */}
              {(isCommentAuthor ||
                (isAdmin && !isAuthorSuperAdmin) ||
                (isBlogOwner && !isAuthorAdmin && !isAuthorSuperAdmin)) && (
                <button
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => commentFunc.deleteComment(comment.id)}
                >
                  Delete
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 ml-6">{comment.content}</p>
      <div>
        {/* so reply input will only be shown for those comment on which user clicked for reply otherwise due to map reply field will be shown to every comments */}
        {replyState.id === comment.id && (
          <div className="mt-2">
            <input
              id="reply"
              name="reply"
              type="text"
              value={reply.content}
              // so if user is replying to owns comment then show reply yours comment
              placeholder={`Reply to ${
                isCommentAuthor ? "Yours" : commentBy + `'s`
              } comment`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReply(e.target.value)
              }
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div>
              <input
                className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
                value="reply"
              />
              <button onClick={() => setReplyState({ id: null })}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {replyState.id !== comment.id && (
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => (
              setReplyState({ id: comment.id })
            )
            }
          >
            Reply
          </button>
        )}
      </div>
      {replies.map((reply: any) => (
        <div key={reply.id} className="ml-10">
          <div>
            <CommentWithReplies
              comment={reply}
              allUsers={allUsers}
              allReplies={allReplies}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

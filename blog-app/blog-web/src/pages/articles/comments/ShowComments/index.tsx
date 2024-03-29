import CreateIcon from '@mui/icons-material/Create';
import MessageIcon from "@mui/icons-material/Message";
import ROUTE_PATHS from 'Router/paths';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComment } from "store/comment";
import { hasPermission } from "utils";
import { AllCommentsState } from "../AddComment/types";
import "./index.css";
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
  userDetails,
  ownerId
}: any) {
  const commentHook = useComment();
  const auth = useAuth();
  const navigate = useNavigate();
  const userData: User = auth.state.user!;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<EditCommentPayload>({
    id: null,
    userId: null,
    parentId: null,
    content: "",
  });

  const uploadedByUser =
    allUsers && allUsers.find((user: User) => user.id === comment.userId);

  const [reply, setReply] = useState<ReplyState>({
    userId: userData?.id,
    articleId: blogId,
    parentId: comment.id,
    content: "",
  });

  const isCommentAuthor: boolean = comment.userId === userData?.id;
  const uploadedByUserRole: string = uploadedByUser?.role;
  const isAuthorSuperAdmin: boolean = uploadedByUserRole === "super-admin";
  const commentBy: string = uploadedByUser?.username;

  const replies =
    allReplies &&
    allReplies.filter(
      (reply: AllCommentsState) => reply.parentId === comment.id
    );

  const isAuthorAdmin: boolean = uploadedByUserRole === "admin";
  const isSuperAdmin: boolean = auth.state.user?.role === "super-admin";
  const isAdmin: boolean = hasPermission("admin", userData?.role);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEdit) {
      commentHook.editComment({ ...editComment });
      setEditState(false);
    } else {
      commentHook.addComment({ ...reply });
      setReply({ ...reply, content: "" });
      setReplyState(null);
    }
  }

  return (
    <div>
      <div className="relative">
        <div className="flex items-center">
          <div className='flex md:flex-col sm:flex-col md:mb-2 sm:mb-2'>
            <button
              onClick={() => {
                navigate(
                  ROUTE_PATHS.VIEW_PROFILE +
                  // userData to only check uploadedByUser.id === userData.id this condition if user is loggedIn 
                  // if their is no userData means user is not loggedIn
                    ((userData && uploadedByUser.id === userData.id) ? "me" : uploadedByUser.id)
                );
              }}
              className="text-lg mr-2 flex items-center text-white"
            >
              - &nbsp;
              <span className="transition hover:text-blue-400 mr-2">{commentBy}</span>
              {uploadedByUserRole === "super-admin" && "*"}
              {/* to show pen icon beside owner name of the blog */}
              {(uploadedByUser && uploadedByUser.id === ownerId) && <CreateIcon titleAccess='Author' />}
            </button>
            <p className="text-gray-400 md:ml-4 sm:ml-4">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
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
                className="p-2 text-gray-400 absolute right-0 bottom-0"
                type="button"
                // when user clicked on three-dots drop-down first then add comment.id in it and when user clicked again on three-dots drop-down then add null so three-dots drop-down get hidden
                onClick={() =>
                  setDropDown(dropDown === comment.id ? null : comment.id)
                }
              >
                <svg
                  className="w-5 h-5 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </button>
            )}
        </div>
        <div
          id="dropdownComment1"
          className={`${
            dropDown === comment.id ? "block" : "hidden"
          } w-20 rounded absolute top-6 md:top-14 right-0 shadow bg-gray-700`}
        >
          <ul
            className="py-1 text-center text-sm text-white"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              {(isCommentAuthor ||
                (isAdmin && !isAuthorSuperAdmin) ||
                isSuperAdmin) && (
                <button
                  className="py-2 w-full hover:bg-gray-600 hover:text-white dark:text-white"
                  onClick={() => {
                    // if user had clicked on reply then first hide that reply input field then show edit comment field
                    replyState && setReplyState(null);
                    setIsEdit(true);
                    setDropDown(null);
                    setEditState(comment.id);
                    setEditComment({
                      ...editComment,
                      id: comment.id,
                      userId: comment.userId,
                      // also fetching the comment content in the state because we can't directly put comment.content in input value because then onChange wouldn't work
                      content: comment.content,
                      parentId: comment.parentId
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
                  className="block py-2 w-full hover:bg-gray-600 hover:text-white dark:text-white"
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
        <>
          <form onSubmit={submit}>
            <div className="comment-field">
              <textarea
                id="content"
                rows={1}
                name="content"
                placeholder="Edit Comment"
                value={editComment.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setEditComment({ ...editComment, content: e.target.value })
                }
                required
                className="text-area"
              />
            </div>
            <div className="flex sm:flex-col">
              <input
                onClick={() => setEditState(null)}
                className="action-button"
                type="submit"
                value="Cancel"
              />
              <input
                className="action-button ml-2 sm:mt-2 xs:mt-2"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </>
      ) : (
        <p className="text-gray-400 ml-4">{comment.content}</p>
      )}
      <div>
        {/* so reply input will only be shown for those comment on which user clicked for reply otherwise due to map reply field will be shown to every comments */}
        {replyState === comment.id ? (
          <form onSubmit={submit}>
            <div className="comment-field">
              <textarea
                name="reply"
                rows={1}
                value={reply.content}
                // so if user is replying to owns comment then show reply yours comment
                placeholder={`Reply to ${
                  isCommentAuthor ? "Yours" : commentBy + `'s`
                  // when user is replying to a reply then show Reply to yours/username reply else Reply to yours/username comment
                } ${comment.parentId ? "reply" : "comment"}`}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReply({ ...reply, content: e.target.value })
                }
                className="text-area"
                required
              />
            </div>
            <div className="flex md:flex-col sm:flex-col xs:flex-col">
              <input
                className="action-button"
                onClick={() => setReplyState(null)}
                type="submit"
                value="Cancel"
              />
              <input
                className="action-button ml-2 md:mt-2 sm:mt-2 xs:mt-2"
                type="submit"
                value="Reply"
              />
            </div>
          </form>
        ) : (
          // reply button wouldn't be shown when user has clicked on reply button and Reply button will only be visible when user is loggedIn
          // if blog owner is banned then reply button wouldn't be shown
          userData &&
          userDetails &&
          !userDetails.isBanned && (
            <div
              className="flex items-center w-20 mt-2 space-x-4"
              onClick={() => {
                // so if user had clicked on edit comment then first hide that edit comment input then show add comment.id in replyState
                editState && setEditState(null);
                // if three-dots drop-down button is visible then hide it
                dropDown && setDropDown(null);
                // if user had clicked in edit before then isEdit will be true hence when user click on reply make sure to change isEdit to false else it'll send the request to editComment instead of reply
                isEdit && setIsEdit(false);
                setReplyState(comment.id);
              }}
            >
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 font-medium"
              >
                <MessageIcon />
                <span className="ml-2 text-lg hover:underline">Reply</span>
              </button>
            </div>
          )
        )}
        <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      {replies.map((reply: AllCommentsState) => (
        <div key={reply.id} className="ml-10">
          <div>
            {/* calling <ShowCommentsPage /> component within it self called Recursion */}
            {/* because of recursion we've to pass the props agin in ShowCommentsPage */}
            <ShowCommentsPage
              comment={reply}
              allUsers={allUsers}
              isCommentAuthor={isCommentAuthor}
              isBlogOwner={isBlogOwner}
              allReplies={allReplies}
              replyState={replyState}
              setReplyState={setReplyState}
              // mandatory to call userDetails here for recursion to show reply button on Replies and check whether the user is banned or NOT
              userDetails={userDetails}
              dropDown={dropDown}
              blogId={blogId}
              setDropDown={setDropDown}
              editState={editState}
              ownerId={ownerId}
              setEditState={setEditState}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

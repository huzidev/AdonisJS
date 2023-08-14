import ROUTE_PATHS from "Router/paths";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComment } from "store/comment";
import { hasPermission } from "utils";
import { useCommentPageHooks } from "./hooks";
import { AllCommentsState, PropsState } from "./types";

export default function CommentsPage(props: PropsState): JSX.Element {
  const comment = useComment();
  const auth = useAuth();
  const userData = auth.state.user;
  const { content, setContent, allComments, allUsers, allReplies, toReply } = useCommentPageHooks();
  const [replyState, setReplyState] = useState<any>({
    id: null,
  });
  const [reply, setReply] = useState<any>('')

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.addComment(content);
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({allComments && allComments.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={submit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              name="comment"
              rows={6}
              value={content.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent({ ...content, content: e.target.value })
              }
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
        <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div>
              {allComments &&
                allComments.map((value: AllCommentsState, index: number) => {
                  const uploadedByUser = allUsers && allUsers?.find(
                    (user: User) => user.id === value.userId
                  );
                  const commentBy = uploadedByUser?.username;
                  const uploadedByUserRole = uploadedByUser?.role;
                  const isBlogOwner = props.ownerId === userData?.id;
                  const isCommentAuthor = value.userId === userData?.id;
                  const isAuthorSuperAdmin = uploadedByUserRole === "super-admin";
                  const isAuthorAdmin = uploadedByUserRole === "admin";
                  const isAdmin = hasPermission("admin", userData?.role);
                  // to get specific replies according to specific comments
                  const replies = allReplies.filter((reply: any) => reply.parentId === value.id)
                  return (
                      <div key={index}>
                        <div>
                          <div className="flex">
                            <p className="inline-flex text-lg items-center mr-3 text-gray-900 dark:text-white">
                              {/* (asterik *) will be shown with the name of super-admin */}
                              - {commentBy} {isAuthorSuperAdmin && "*"} {value.id}
                            </p>
                            <p>{new Date(value.createdAt).toLocaleDateString()}</p>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 ml-6">{value.content}</p>
                        </div>
                        {/* so reply input will only be shown for those comment on which user clicked for reply otherwise due to map reply field will be shown to every comments */}
                        {replyState.id === value.id && (
                          <div className="mt-2">
                            <input
                              id="reply"
                              name="reply"
                              type="text"
                              value={content.content}
                              // so if user is replying to owns comment then show reply yours comment
                              placeholder={`Reply to ${isCommentAuthor ? "Yours" : commentBy} comment`}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReply(e.target.value)}
                              required
                              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <div>
                              <input
                                className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                                value="post"
                              />
                              <button onClick={() => setReplyState({ id: null })}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                       
                        {(isCommentAuthor ||
                          (isAdmin && !isAuthorSuperAdmin)) && (
                            <Link to={ROUTE_PATHS.EDIT_COMMENT + value.id}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                              Edit
                            </Link>  
                        )}
                        {" "}
                        {/* // means if admin is loggedIn or Blog's owner is loggedIn then show delete button BUT not on super-admins and admins comment */}
                        {(isCommentAuthor ||
                          ((isAdmin && !isAuthorSuperAdmin) 
                          || (isBlogOwner && (!isAuthorAdmin && !isAuthorSuperAdmin)))) 
                          && (
                            <button
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              onClick={() => comment.deleteComment(value.id)}
                            >
                              Delete
                            </button>
                        )}
                        {" "}
                        <button
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          onClick={() => setReplyState({ id: value.id })}
                        >
                          Reply
                        </button>
                        {replies && replies.map((reply: any, index: number) => {
                          const ReplyByUser = allUsers && allUsers?.find(
                              (user: User) => user.id === reply.userId
                            );
                            const replyBy = ReplyByUser?.username;
                            const replyByRole = ReplyByUser?.role;
                            const toReplies = toReply && toReply.filter((value: any) => value.parentId === reply.id)
                          return (
                            <div key={index} className="ml-10">
                                <div className="flex">
                                  <p>
                                    {reply.id} &nbsp;
                                  </p>
                                  <p>{replyBy} {replyByRole && "*"}</p>
                                  <p className="text-gray-500 dark:text-gray-400 ml-2">{reply.content}</p>
                                </div>
                                <div>
                                  {toReplies.map((toReply: any, index: number) => {
                                    return (
                                      <div className="flex" key={index}>
                                        <p >{replyBy} {replyByRole && "*"}</p>
                                        <p className="text-gray-500 dark:text-gray-400 ml-2">{toReply.content}</p>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>  
                          )})}
                      </div>
                  );
                })}
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}

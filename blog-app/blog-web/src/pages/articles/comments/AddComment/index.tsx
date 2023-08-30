import { useState } from "react";
import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComment } from "store/comment";
import ShowCommentsPage from "../ShowComments";
import { useCommentPageHooks } from "./hooks";
import { AllCommentsState, PropsState } from "./types";

export default function AddCommentPage(props: PropsState): JSX.Element {
  const comment = useComment();
  const auth = useAuth();
  const userData = auth.state.user;
  const { addComment, setAddComment, allComments, allUsers, allReplies, blogId } =
    useCommentPageHooks();
  const [replyState, setReplyState] = useState(null);
  const [dropDown, setDropDown] = useState(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.addComment(addComment);
    // after adding comment the text-area for add comment will became empty
    setAddComment({ ...addComment, content: '' });
  }

  return (
    <section className="bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font- text-white">
            Comments ({allComments && allComments.length})
          </h2>
        </div>
        <form className="mb-6" onSubmit={submit}>
          <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border border-gray-400 bg-gray-800 ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              name="comment"
              rows={6}
              value={addComment.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAddComment({ ...addComment, content: e.target.value })
              }
              className="px-0 w-full text-sm text-white border-0 focus:ring-0 focus:outline-none placeholder-gray-400 bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-centertext-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-primary-800 text-white"
          >
            Post comment
          </button>
        </form>
        <article className="p-6 mb-6 text-base rounded-lg bg-gray-900">
          <footer className="flex justify-between items-center mb-2">
            <div>
              {allComments &&
                allComments.map((comment: AllCommentsState, index: number) => {
                  const uploadedByUser = allUsers &&
                    allUsers?.find((user: User) => user.id === comment.userId);
                  const commentBy = uploadedByUser?.username;
                  const uploadedByUserRole = uploadedByUser?.role;
                  const isBlogOwner = props.ownerId === userData?.id;
                  return (
                    <div key={index}> 
                      <ShowCommentsPage
                        key={comment.id}
                        comment={comment}
                        allUsers={allUsers}
                        commentBy={commentBy}
                        uploadedByUserRole={uploadedByUserRole}
                        allReplies={allReplies}
                        blogId={blogId}
                        isBlogOwner={isBlogOwner}
                        replyState={replyState}
                        setReplyState={setReplyState}
                        dropDown={dropDown}
                        setDropDown={setDropDown}
                      />
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

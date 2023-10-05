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
  const { addComment, setAddComment, allComments, allUsers, allReplies, blogId, loggedInId, userDetails, ownerId } =
    useCommentPageHooks();
  const [replyState, setReplyState] = useState<number | null>(null);
  const [editState, setEditState] = useState<number | null>(null);
  const [dropDown, setDropDown] = useState<number | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.addComment(addComment);
    // after adding comment the text-area for add comment will became empty
    setAddComment({ ...addComment, content: '' });
  }

  return (
    <section className="bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center">  
          <h2 className="text-2xl text-white">
            Comments ({allComments && allComments.length})
          </h2>
        </div>
        {/* add comment field will only be visible if user is loggedIn and if blog owner is banned then user can't add the comment */}
        {loggedInId && (userDetails && !userDetails.isBanned) && (
          <form className="mb-4" onSubmit={submit}>
            <div className="p-2 my-4 rounded-lg border border-gray-400 bg-gray-800">
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
              />
            </div>
            <button
              type="submit"
              className="text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm w-32 py-2 bg-blue-600 focus:ring-blue-800 transition hover:bg-blue-700"
            >
              Post comment
            </button>
          </form>
        )}
          <div className="my-2 text-base rounded-lg bg-gray-900 flex justify-between items-center">
            <div className="w-full">
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
                        ownerId={ownerId}
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
                        editState={editState}
                        userDetails={userDetails}
                        setEditState={setEditState}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
      </div>
    </section>
  );
}

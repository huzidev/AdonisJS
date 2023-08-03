import { useAuth } from "store/auth";
import { User } from "store/auth/types";
import { useComments } from "store/comment";
import { hasPermission } from "utils";
import { useCommentPageHooks } from "./hooks";
import { AllCommentsState } from "./types";

export default function CommentsPage(props: any): JSX.Element {
  const comment = useComments();
  const auth = useAuth();
  const userData = auth.state.user;
  const { content, setContent, allComments, allUsers } = useCommentPageHooks();
 
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.addComment(content);
  }

  console.log("all comments", allComments);

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
              value={content.comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent({ ...content, comment: e.target.value })
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
              {allComments && allComments.map((comment: AllCommentsState, index: number) => {
                const uploadedByUser = allUsers?.find(
                  (user: User) => user.id === comment.userId
                ); 
                const commentBy = uploadedByUser && uploadedByUser.username;
                const uploadedByUserRole = uploadedByUser && uploadedByUser.role;
                return (
                  <div key={index}>
                    <div className="flex">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        {commentBy}
                      </p>
                      <p>
                        {comment.comment}
                      </p>
                    </div>
                    <p>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    {
                      (comment.userId === userData?.id || 
                      (hasPermission("admin", userData?.role) &&
                        uploadedByUserRole !== "super-admin")) &&
                    <div>
                      <button>
                        Edit
                      </button>
                      {" "}
                          <button>
                            Delete
                          </button>
                    </div>
                    }
                  </div>
                )
              })}
            </div>
            </footer>
           </article>
      </div>
    </section>
  );
}

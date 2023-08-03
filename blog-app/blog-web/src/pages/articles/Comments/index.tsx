import { useComments } from "store/comment";
import { useCommentPageHooks } from "./hooks";

export default function CommentsPage(): JSX.Element {
  const comment = useComments();
  const { content, setContent, allComments } = useCommentPageHooks();
 
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment.addComment(content);
  }

  console.log("Comments", allComments);

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments
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
            <div className="flex items-center">
              {allComments && allComments.map((comment: any, index: number) => {
                const commentBy = comment.userId 
                return (
                  <p key={index} className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                    />
                    {comment.comment}
                  </p>
                )
              })}
            </div>
            </footer>
           </article>
      </div>
    </section>
  );
}

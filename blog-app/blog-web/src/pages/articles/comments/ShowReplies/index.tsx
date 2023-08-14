import { User } from "store/auth/types";
import { AllCommentsState } from "../ShowComments/types";

export default function CommentWithReplies({ comment, allUsers, allReplies }: any) {
  const uploadedByUser = allUsers.find(
    (user: User) => user.id === comment.userId
  );
  const commentBy = uploadedByUser?.username;
  const uploadedByUserRole = uploadedByUser?.role;
  const replies = allReplies.filter(
    (reply: AllCommentsState) => reply.parentId === comment.id
  );

  return (
    <div>
      <div className="flex">
        <p className="inline-flex text-lg items-center mr-3 text-gray-900 dark:text-white">
          - {commentBy} {uploadedByUserRole === "super-admin" && "*"}{" "}
        </p>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 ml-6">{comment.content}</p>
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
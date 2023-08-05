import { useEffect, useState } from "react";
import { useComments } from "store/comment";

export default function EditCommentPage(): JSX.Element {
    const comment = useComments();

    const [content, setContent] = useState();
    useEffect(() => {
        
    }, [])
  return (
    <div>
        Edit Comment
    </div>
  )
}

import { useParams } from "react-router-dom";
import { getBlog } from "../../../../store/articles/actions";
import { useAppDispatch } from "../../../../store/hooks/hooks";

export default function BlogView(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  function call() {
    dispatch(getBlog(Number(params.id)))
    console.log("id", params);
  }

  return (
    <div>
        Blog
        <button onClick={call}>
          test 
        </button>
    </div>
  )
}

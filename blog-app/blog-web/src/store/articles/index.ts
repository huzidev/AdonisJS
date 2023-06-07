import { getBlogs, initialState } from "./actions";
export const useBlogsHook = () => {
    if (initialState.allBlogs.length === 0) {
        getBlogs();
    } else {
        alert("Notes are already fetched")
    }
}
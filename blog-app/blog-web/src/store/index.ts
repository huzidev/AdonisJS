import { configureStore } from "@reduxjs/toolkit";
import getBlogs from "./articles/actions";
import auth from "./auth/reducer";

const store = configureStore({
    reducer: {
        blogs: getBlogs,
        auth
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
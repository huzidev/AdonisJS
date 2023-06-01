import { configureStore } from "@reduxjs/toolkit";
import getBlogs from "./articles/actions";
import initUser from "./auth/actions";

const store = configureStore({
    reducer: {
        blogs: getBlogs,
        user: initUser
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
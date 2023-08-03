import { configureStore } from "@reduxjs/toolkit";
import blogs from "./articles/reducer";
import auth from "./auth/reducer";
import comments from "./comment/reducer";
import emailVerification from "./emailVerification/reducer";
import reset from "./resetPassword/reducer";
import user from "./user/reducer";

const store = configureStore({
    reducer: {
        blogs,
        auth,
        user,
        reset,
        comments,
        emailVerification
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
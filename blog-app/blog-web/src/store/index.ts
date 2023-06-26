import { configureStore } from "@reduxjs/toolkit";
import blogs from "./articles/reducer";
import auth from "./auth/reducer";
import user from "./user/reducer";

const store = configureStore({
    reducer: {
        blogs,
        auth,
        user
    }
})

export default store;

// will use these two types for useSelector(for State) and for useDispatch(to run/send) function
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
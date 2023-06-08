import { useEffect, useState } from "react";
import { useAuth } from "store/articles";
import { getBlogs } from "store/articles/actions";
import { useUser } from "store/auth";
import { initUser } from "store/auth/actions";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const auth = useAuth();
    const user = useUser();
    const [state, setState] = useState<boolean>(false);
    const currPath = window.location.pathname;
    const token = useAppSelector((state) => state.user.getUser);

        console.log("token", token);
        
        const dispatch = useAppDispatch();
        useEffect(() => {
            if (auth.allBlogsState.length === 0) {
               dispatch(getBlogs())
            }
            if (!user.userDetails === false) {
            dispatch(initUser());
        }
    }, [currPath])

    // if (!state) {
    //     <PageLoader />
    // }

    return children;
}

import { useEffect, useState } from "react";
import { useAuth } from "store/articles";
import { initUser } from "store/auth/actions";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const auth = useAuth();
    console.log(auth);
    
    
    const [state, setState] = useState<boolean>(false);
    const currPath = window.location.pathname;
    const token = useAppSelector((state) => state.user.getUser);

        console.log("token", token);
        
        const dispatch = useAppDispatch();
        useEffect(() => {
            if (!token) {
                dispatch(initUser());
                console.log("token after", token);
                setState(true);
                console.log("token after", token);
        }
    }, [token, currPath])

    // if (!state) {
    //     <PageLoader />
    // }

    return children;
}

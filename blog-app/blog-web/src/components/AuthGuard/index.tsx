import { useEffect, useState } from "react";
import { useBlogsHook } from "store/articles";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const auth = useBlogsHook();
    useEffect(() => {
        
    }, [])
}

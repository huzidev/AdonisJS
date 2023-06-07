import { useState } from "react";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    

    // if (!state) {
    //     <PageLoader />
    // }

    return children;
}

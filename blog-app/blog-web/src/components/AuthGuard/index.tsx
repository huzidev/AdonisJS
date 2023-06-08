import { useEffect, useState } from "react";
import { useAuth } from "store/auth";

interface AuthGuardProps {
  children: JSX.Element;
}
export default function AuthGuard({ children }: AuthGuardProps): JSX.Element {
    const [state, setState] = useState<boolean>(false);
    const auth = useAuth();

    
    useEffect(() => {
      console.log('logged');
      
      const { init } = auth.state;
      if (!init.init && !init.loading) {
        auth.initUser();
      }

      if (init.init) {
        setState(true);
      }
    }, [auth.state]);

    if (!state) {
      return <h1>Loading</h1>;
    }

    return children;
}

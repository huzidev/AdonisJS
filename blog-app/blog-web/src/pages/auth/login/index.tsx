import { useState } from "react";
import { signIn } from "../../../store/auth/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { AuthState } from "./types";

export default function UserSignInPage() {
    const initialState: AuthState = { email: "", password: "" };
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(initialState);
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    
    async function login() {
        dispatch(signIn(user))
    }
    return (
        <div>
            <h1>
                Login
            </h1>
            <input 
                type="email"
                name="email"
                value={user.email} 
                placeholder="email"
                onChange={inputHandler}
                />
            <input 
                type="password"
                name="password"
                value={user.password}
                placeholder="Password" 
                onChange={inputHandler}
            />
            <button onClick={login}>
                Login
            </button>
        </div>
  )
}

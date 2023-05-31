import { useState } from "react";
import { signUp } from "../../../store/auth/actions";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { RegisterState } from "./types";

export default function UserSignUpPage() {
    const initialState: RegisterState = { username: "", email: "", password: "", passwordConfirmation: "" };
    const [user, setUser] = useState(initialState);
    const dispatch = useAppDispatch();
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const { username, email, password, passwordConfirmation } = user;

    async function signup() {
        dispatch(signUp(user))
    };
    return (
        <div>
            <h1>
                Register
            </h1>
            <input 
                type="text"
                name="username"
                value={username} 
                placeholder="Username"
                onChange={inputHandler}
            />
            <input 
                type="email"
                name="email"
                value={email} 
                placeholder="Email"
                onChange={inputHandler}
                />
            <input 
                type="password"
                name="password"
                value={password} 
                placeholder="Password"
                onChange={inputHandler}
            />
            <input 
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation} 
                placeholder="Confirm Password"
                onChange={inputHandler}
            />
            <button onClick={signup}>
                Register
            </button>
        </div>
  )
}

import { useState } from "react";
import { AuthState } from "./types";

export default function Login() {
    const initialState: AuthState = { username: "", password: "" }
    const [user, setUser] = useState(initialState)
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const { username, password } = user;

    async function login() {
        console.log("login");
    }

    return (
        <div>
            <h1>
                Login
            </h1>
            <input 
                type="text"
                name="username"
                value={username} 
                onChange={inputHandler}
                />
            <input 
                type="password"
                name="password"
                value={password} 
                onChange={inputHandler}
            />
            <button onClick={login}>
                Login
            </button>
        </div>
  )
}

import { useState } from "react";
import { AuthLogin } from "./types";

export default function login() {
    const initialState: AuthLogin = { username: "", password: "" }
    const [user, setUser] = useState(initialState)
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const { username, password } = user;

        

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
            
        </div>
  )
}

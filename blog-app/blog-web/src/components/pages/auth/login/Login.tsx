import axios from "axios";
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

    var data: AuthState = {
        username,
        password
    };

    const config = {
        method: "post",
        url: "http://127.0.0.1:3333/signin",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    async function login() {
        const response = await axios(config);
        console.log("Response for login", response);
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
                placeholder="Username"
                onChange={inputHandler}
                />
            <input 
                type="password"
                name="password"
                value={password}
                placeholder="Password" 
                onChange={inputHandler}
            />
            <button onClick={login}>
                Login
            </button>
        </div>
  )
}

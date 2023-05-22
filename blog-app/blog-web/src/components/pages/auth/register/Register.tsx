import { useState } from "react";
import { RegisterState } from "./types";

export default function Register() {
    const initialState: RegisterState = { username: "", email: "", password: "" }
    const [user, setUser] = useState(initialState)
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const { username, email, password } = user;

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
            <button onClick={login}>
                Login
            </button>
        </div>
  )
}

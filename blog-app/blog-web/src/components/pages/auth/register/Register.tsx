import axios from "axios";
import { useState } from "react";
import { RegisterState } from "./types";

export default function Register() {
    const initialState: RegisterState = { username: "", email: "", password: "", cpassword: "" }
    const [user, setUser] = useState(initialState)
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    const { username, email, password, cpassword } = user;

    var data: RegisterState = {
        username,
        email,
        password,
        cpassword
    };

    const config = {
        method: 'post',
        url: "http://127.0.0.1:3333/signup",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }

    async function login() {
        try {
            const response = await axios(config);       
        } catch (e) {
            console.log("Error", e);
                        
        }

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
            <input 
                type="password"
                name="cpassword"
                value={cpassword} 
                placeholder="Confirm Password"
                onChange={inputHandler}
            />
            <button onClick={login}>
                Login
            </button>
        </div>
  )
}

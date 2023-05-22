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
        

    return (
        <div>
            <h1>
                Login
            </h1>
            <input 
                type="text" 
            />
        </div>
  )
}

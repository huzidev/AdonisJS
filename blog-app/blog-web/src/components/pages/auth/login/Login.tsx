import { useState } from "react";
import { AuthLogin } from "./types";

export default function login() {
    const initialState: AuthLogin = { username: "", password: "" }
    const [user, setUser] = useState(initialState)
  
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

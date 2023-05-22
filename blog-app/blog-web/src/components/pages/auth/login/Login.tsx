import { useState } from "react";

export default function login() {
    const initialState = { username: "", password: "" }
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

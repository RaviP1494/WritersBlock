import { useState } from "react";

export default function LogIn({setUsername}) {
    const [userCheck, setUserCheck] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
        <h1> Log In </h1>

        <div>
        <input value={userCheck} 
        placeholder="username"
        onChange={(e)=>setUserCheck(e.target.value)}/>
        </div>

        <div>
        <input value={password} 
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        <button onClick={()=>setUsername(userCheck)}>
        Log In
        </button>
        </div>
    );
}

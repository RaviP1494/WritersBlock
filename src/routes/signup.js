import { useState } from "react";

export default function SignUp({setUsername}) {
    const [userCreate, setUserCreate] = useState("");
    const [pwdCreate, setPwdCreate] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    return (
        <div>
        <h1> Sign Up </h1>

        <div>
        <input value={userCreate} 
        placeholder="username"
        onChange={(e)=>setUserCreate(e.target.value)}/>
        </div>

        <div>
        <label htmlFor="pwdCreate"></label>
        <input 
        id="pwdCreate"
        value={pwdCreate} 
        placeholder="create password"
        onChange={(e)=>setPwdCreate(e.target.value)}/>
        </div>

        <div>
        <label htmlFor="pwdConfirm"></label>
        <input 
        id="pwdConfirm"
        value={pwdConfirm} 
        placeholder="confirm password"
        onChange={(e)=>setPwdConfirm(e.target.value)}/>
        </div>

        <button 
        onClick={()=>setUsername(userCreate)}
        >Submit</button>
        </div>
    );
}

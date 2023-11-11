import { useState } from "react";

import "../styles/SuspenSpurt.css";
export default function InfoSpurtEdit({suspenSpurt, dispatch}){
    const [currText, setCurrText] = useState(suspenSpurt.text);

    function spurtEditEnd(){
        dispatch({
            type: "spurteditend",
            suspenSpurt: {...suspenSpurt, text: currText}
        });
    }

    return (
        <div 
        className="suspenspurt">
        <div 
        className="suspenspurt-btns">
        <button 
        onClick={spurtEditEnd}>
        End</button>
        <textarea 
        value={currText} 
        onChange={(e)=>setCurrText(e.target.value)}
        />
        </div>
        </div>
    );
}

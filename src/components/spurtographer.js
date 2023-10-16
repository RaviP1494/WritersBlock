import { useState } from "react";

import WritersBlock from "../components/writersblock.js";

import "../styles/Spurtographer.css";

export default function Spurtographer({dispatch}){
    const [spurtDelay, setSpurtDelay] = useState(7000);

    function handleSpurtDelayChange(increasing){
        if(increasing){
            setSpurtDelay((prev)=>prev+500);
        }
        else{
            setSpurtDelay((prev)=>prev-500);
        }
    }

    function addNewStream(e){
        dispatch({
            type: "streamaddnew"
        });
    }

    return (
        <div className="spurtographer">
            <button onClick={addNewStream}>
            New Stream
            </button>
            <div className="delay-box">
            <button 
            onClick={()=>handleSpurtDelayChange(false)}>
            -
            </button>
            <span>{spurtDelay/1000} seconds</span>
            <button 
            onClick={()=>handleSpurtDelayChange(true)}>
            +
            </button>
            </div>
            <WritersBlock 
            spurtDelay={spurtDelay}
            dispatch={dispatch}
            />
        </div>
    );
}

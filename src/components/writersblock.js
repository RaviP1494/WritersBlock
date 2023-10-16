import { useState } from "react";

import "../styles/WritersBlock.css";

export default function WritersBlock({spurtDelay, dispatch}){
    const [currText, setCurrText] = useState("");
    const [spurtTimeoutId, setSpurtTimeoutId] = useState(null);
    const [startTime, setStartTime] = useState(null);

    function handleKeyInput(e) {
        if (spurtTimeoutId) {
            clearTimeout(spurtTimeoutId);
        }
        if(!startTime || !currText){
            setStartTime(Date.now());
        }
        setSpurtTimeoutId(setTimeout(
            ()=>{
                if(currText){
                    dispatch({
                        type: "spurtEnd",
                        spurt: {
                            text: currText, 
                            tSpan: Date.now() - startTime
                        }
                    });
                }
                setCurrText("");
                setSpurtTimeoutId(null);
                setStartTime(null);
            }, spurtDelay));
    }

    function handleKeyDown(e){
        handleKeyInput(e);
    }

    function handleKeyUp(e){
        handleKeyInput(e);
    }

    return (
        <div>
        <textarea
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        className="writersblock"
        ></textarea>
        </div>
    );
}

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
                    const now = new Date();
                    const createDTime = now.toLocaleString().split(",");
                    dispatch({
                        type: "spurtEnd",
                        spurt: {
                            text: currText, 
                            createDate: createDTime[0],
                            createTime: createDTime[1],
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

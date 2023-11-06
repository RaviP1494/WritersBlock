import { useState } from "react";

import "../styles/WritersBlock.css";

export default function WritersBlock({spurtDelay, openDispatch, nextSpurtId, setNextSpurtId}){
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
                    openDispatch({
                        type: "addSpurt",
                        spurt: {
                            id: nextSpurtId,
                            text: currText, 
                            createDTime: Date.now(),
                            createDate: createDTime[0],
                            createTime: createDTime[1],
                            tSpan: Date.now() - startTime
                        }
                    });
                    setNextSpurtId((prev)=>prev+1);
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

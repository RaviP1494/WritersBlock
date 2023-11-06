import { useState } from "react";

import WritersBlock from "../components/writersblock.js";

import "../styles/Spurtographer.css";

export default function Spurtographer({openDispatch, nextStreamId, nextSpurtId, setNextStreamId, setNextSpurtId}){
    const [spurtDelay, setSpurtDelay] = useState(2000);

    function handleSpurtDelayChange(increasing){
        if(increasing){
            setSpurtDelay((prev)=>prev+500);
        }
        else{
            setSpurtDelay((prev)=>prev-500);
        }
    }

    function addNewStream(e){
        openDispatch({
            type: "addStream",
            nextStreamId: nextStreamId,
        });
        setNextStreamId((prev)=>prev+1);
    }

    return (
        <div className="spurtographer">
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
            openDispatch={openDispatch}
            nextSpurtId={nextSpurtId}
            setNextSpurtId={setNextSpurtId}
            />
            <button onClick={addNewStream}>
            New Stream
            </button>
        </div>
    );
}

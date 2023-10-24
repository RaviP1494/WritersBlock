import { useState } from "react";

import SpurtsBox from "./spurtsbox.js";
import StreamHeader from "./streamheader.js";

import "../styles/WStream.css";

export default function WStream({stream, dispatch, setSuspStreams, selectedSpurtId}){
    const [viewMode, setViewMode] = useState(2);
    const [blindMode, setBlindMode] = useState(false);

    function spurtSelect(spurt){
        dispatch({
            type: "spurtselect",
            spurt: spurt,
            streamId: stream.id
        })
    }

    return (
        <div className="streamview">
        <StreamHeader 
        stream={stream} 
        dispatch={dispatch}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setSuspStreams={setSuspStreams}
        setBlindMode={()=>setBlindMode(!blindMode)}/>
        { !blindMode && 
            <SpurtsBox 
            spurts={stream.spurts}
            spurtSelect={spurtSelect}
            viewMode={viewMode}
            />
        }
        </div>
    );
};

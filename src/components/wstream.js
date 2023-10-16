import { useState } from "react";

import Spurt from "./spurt.js";
import StreamHeader from "./streamheader.js";

import "../styles/WStream.css";

export default function WStream({stream, dispatch, setSuspStreams}){
    const [viewMode, setViewMode] = useState(0);

    return (
        <div className="streamview">
        <StreamHeader 
        stream={stream} 
        dispatch={dispatch}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setSuspStreams={setSuspStreams}/>
        <div className="spurtsbox">
        {stream.spurts.map((spurt)=>
            <Spurt 
            key={spurt.id}
            spurt={spurt}/>)}
        </div>
        </div>
    );
};

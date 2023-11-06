import { useState } from "react";

import SpurtsBox from "./spurtsbox.js";
import StreamHeader from "./streamheader.js";

import "../styles/OpenStream.css";

export default function OpenStream({openStream, setSuspenItems, setFocusedItem}){
    const [viewMode, setViewMode] = useState(2);
    const [blindMode, setBlindMode] = useState(false);

    function spurtSelect(spurt){
        setFocusedItem({
            ...spurt,
            streamId: openStream.id
        });
    }

    return (
        <div className="streamview">
        <StreamHeader 
        stream={openStream} 
        viewMode={viewMode}
        setViewMode={setViewMode}
        setBlindMode={()=>setBlindMode(!blindMode)}/>
        { !blindMode && 
            <SpurtsBox 
            spurts={openStream.spurts}
            spurtSelect={spurtSelect}
            viewMode={viewMode}
            />
        }
        </div>
    );
};

import { useState } from "react";

import "../styles/StreamHeader.css";

export default function StreamHeader({stream, dispatch, viewMode, setViewMode, setSuspStreams, setBlindMode}){
    const [showDetails, setShowDetails] = useState(false);

    const createDTimeObj = new Date(stream.createDTime);
    const createDTime = createDTimeObj.toLocaleString().split(",");
    const createDate = createDTime[0];
    const createTime = createDTime[1];
    const totalSpurtTSpan = stream.spurts.length > 0 ? 
        stream.spurts.reduce(
        (total, currSpurt)=>
        total+= currSpurt.tSpan, 0
    ) : null;

    function titleClick(){
        dispatch({
            type: "streamtitleclick",
            stream: stream
        });
    }

    function targetStream(){
        dispatch({
            type: "streamtarget",
            streamId: stream.id
        });
    }

    function closeStream(){
        dispatch({
            type: "streamdelete",
            streamId: stream.id
        });
    }

    function cycleView(){
        setViewMode((prev)=>(prev+1) % 3);
        //0 = legato
        //1 = staccato
        //2 = occatats
    }

    function suspendStream(){
        setSuspStreams((prev)=>[...prev, stream]);
        closeStream();
    }

    function saveStream(){
    }

    return (
        <div className="streamheader">
        <h3 
        onClick={titleClick} 
        className="title">{stream.title}</h3>
        <button 
        className="targetbutton"
        onClick={targetStream}>
        Target
        </button>
        <button 
        className="closebutton"
        onClick={closeStream}>
        Close
        </button>
        <button
        className="viewmodebutton"
        onClick={cycleView}>
        Mode: {VIEW_MODE_NAMES[viewMode]}
        </button>
        <button
        className="suspendbutton"
        onClick={suspendStream}>
        Suspend
        </button>
        <button
        className="savebutton"
        onClick={saveStream}>
        Save
        </button>
        <button
        className="blindbutton"
        onClick={setBlindMode}>
        Blind
        </button>
        {showDetails ? (
            <div className="streamdetails">
            <div> 
            <div><b>Created On:</b></div>
            <div>{createDate}</div>
            </div>
            <div> 
            <div><b>At :</b></div>
            <div>{createTime}</div>
            </div>
            <div>
            <div><b>Spurts:</b></div>
            <div>{stream.spurts.length}</div>
            </div>
            {totalSpurtTSpan && (
                <div>
                <div><b>Timespan:</b></div>
                <div>{totalSpurtTSpan/1000} seconds</div>
                </div>
            )}
            {stream.dbStreamId ? (
                <div>
                <span><b>Saved At:</b></span>
                <span>{stream.saveDTime}</span>
                </div>
            ) : (
                <div>
                <b>fresh</b>
                </div>
            )}
            <button onClick={()=>setShowDetails(false)}>
            Hide Details
            </button>
            </div>
        ) : ( 
            <button 
            className="streamdetails"
            onClick={()=>setShowDetails(true)}>
            Show Details
            </button>
        )}
        
        </div>
    );
};

const VIEW_MODE_NAMES = ["Legato","Staccato","otaccatS"];

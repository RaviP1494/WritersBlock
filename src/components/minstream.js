import { useState } from "react"
import "../styles/MinStream.css";

export default function MinStream({suspenStream, dispatch, setSuspStreams}){
    const [updatedTitle, setUpdatedTitle] = useState(suspenStream.title);

    const createDTime = new Date(suspenStream.createDTime);
    const createDate = createDTime.toLocaleString().split(",")[0];
    const totalSpurtTSpan = suspenStream.spurts.length > 0 ? 
        suspenStream.spurts.reduce(
        (total, currSpurt)=>
        total+= currSpurt.tSpan, 0
    ) : null;

    function openStream(stream){
        dispatch({
            type: "streamresume",
            stream: stream
        });
        closeStream(stream.id);
    }

    function closeStream(id){
        setSuspStreams((prev) => prev.filter((stream) => stream.id !== id));
        dispatch({
            type: "clearinfoblock"
        });
    }

    function startTitleEdit(){
        dispatch({
            type: "suspstreamtitleeditstart"
        });
    }

    function endTitleEdit(){
        dispatch({
            type: "suspstreamtitleeditend",
            title: updatedTitle
        });
    }

    return (
        <div className="minstream">
        <div className="buttons">
        <button onClick={()=>openStream(suspenStream)}>
        Open</button>
        <button>
        Save</button>
        <button onClick={()=>closeStream(suspenStream.id)}>
        Delete</button>
        </div>
        { ("editTitleState" in suspenStream && suspenStream.editTitleState) ? (
            <div>
            <input value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)}/>
            <button onClick={endTitleEdit}>change</button>
            </div>
        ) : (
            <h3 onClick={()=>startTitleEdit((prev)=>!prev)}>{suspenStream.title}</h3>
        ) }
        <div>
            <div>
            <div>Created On: </div>
            <div>{createDate}</div>
            </div>
            <div>
            <span>Spurts: </span>
            <span>{suspenStream.spurts.length}</span>
            </div>
            {totalSpurtTSpan && (
                <div>
                <div>Total Time Span: </div>
                <div>{totalSpurtTSpan/1000} seconds</div>
                </div>
            )}
            {suspenStream.dbStreamId ? (
                <div>
                <span>Saved At: </span>
                <span>{suspenStream.saveDTime}</span>
                </div>
            ) : (
                <div>
                <b>fresh</b>
                </div>
            )}
        </div>
        </div>
    );
};

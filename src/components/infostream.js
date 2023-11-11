import { useState } from "react"
import "../styles/InfoStream.css";

export default function InfoStream({stream, moveStream}){
    const [updatedTitle, setUpdatedTitle] = useState(stream.title);

    const createDTime = new Date(stream.createDTime);
    const createDateTime = createDTime.toLocaleString().split(",");
    const createDate = createDateTime[0];
    const createTime = createDateTime[1];
    const totalSpurtTSpan = stream.spurts.length > 0 ? 
        stream.spurts.reduce(
        (total, currSpurt)=>
        total+= currSpurt.tSpan, 0
    ) : null;

    return (
        <div className="infostream">
        <div className="buttons">
        <button onClick={moveStream}>
        Move
        </button>
        </div>
        <h3>{stream.title}</h3>
        <div>
            <div>
            <div>Created On: </div>
            <div>{createDate} at {createTime}</div>
            </div>
            <div>
            <span>Spurts: </span>
            <span>{stream.spurts.length}</span>
            </div>
            {totalSpurtTSpan && (
                <div>
                <div>Total Time Span: </div>
                <div>{totalSpurtTSpan/1000} seconds</div>
                </div>
            )}
            {stream.dbStreamId ? (
                <div>
                <span>Saved At: </span>
                <span>{stream.saveDTime}</span>
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

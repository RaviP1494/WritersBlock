import "../styles/MinStream.css";

export default function MinStream({stream, closeStream, openStream}){
    const createDTime = new Date(stream.createDTime);
    const createDate = createDTime.toLocaleString().split(",")[0];
    const totalSpurtTSpan = stream.spurts.length > 0 ? 
        stream.spurts.reduce(
        (total, currSpurt)=>
        total+= currSpurt.tSpan, 0
    ) : null;

    return (
        <div className="minstream">
        <div className="buttons">
        <button onClick={()=>openStream(stream)}>
        Open</button>
        <button>
        Save</button>
        <button onClick={()=>closeStream(stream.id)}>
        Close</button>
        </div>
        <h3>{stream.title}</h3>
        <div>
            <div>
            <div>Created On: </div>
            <div>{createDate}</div>
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

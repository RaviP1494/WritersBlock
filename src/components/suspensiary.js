import "../styles/Suspensiary.css";

export default function Suspensiary({dispatch, suspStreams, setSuspStreams}){
    function selectStream(stream){
        dispatch({
            type: "suspstreamselect",
            stream: stream
        });
    }

    function closeStream(id){
        setSuspStreams((prev) => prev.filter((stream) => stream.id !== id));
    }

    return (
        <div className="suspensiary">
        <h1 className="title">
        Suspensiary
        </h1>
        <div className="suspended-streams">
        { suspStreams.map((stream)=> {
            return <button 
            key={stream.id}
            onClick={()=>selectStream(stream)}>
            {stream.title}
            </button>
        })}
        </div>
        </div>
    );
};

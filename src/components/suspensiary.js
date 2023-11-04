import "../styles/Suspensiary.css";

export default function Suspensiary({dispatch, suspStreams, setSuspStreams}){
    function selectStream(stream){
        dispatch({
            type: "suspstreamselect",
            stream: stream
        });
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

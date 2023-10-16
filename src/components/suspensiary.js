import MinStream from "../components/minstream.js";

import "../styles/Suspensiary.css";

export default function Suspensiary({dispatch, suspStreams, setSuspStreams}){
    function openStream(stream){
        dispatch({
            type: "streamresume",
            stream: stream
        });
        closeStream(stream.id);
    }

    function closeStream(id){
        setSuspStreams((prev) => prev.filter((stream) => stream.id !== id));
    }

    return (
        <div>
        <h1 className="title">
        Suspensiary
        </h1>
        <div className="suspendedstreams">
            {suspStreams.map((stream)=>
                <MinStream 
                key={stream.id}
                stream={stream}
                closeStream={closeStream}
                openStream={openStream}
                />)
            }
        </div>
        </div>
    );
};

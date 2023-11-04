import WStream from "../components/wstream.js";

import "../styles/StreamsBox.css";

export default function StreamsBox({streamsObj, dispatch, setSuspStreams}){
    return (
        <div>
        <h1 style={{textAlign:"center"}}>
        Open Streams
        </h1>
        <div className="streamsbox">
        {streamsObj.streams.map((stream)=>
            <WStream 
            key={stream.id} 
            stream={stream}
            dispatch={dispatch}
            setSuspStreams={setSuspStreams}/>
        )}
        </div>
        </div>
    );
};

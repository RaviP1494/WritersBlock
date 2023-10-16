import { useState, useReducer } from "react";

import Spurtographer from "../components/spurtographer.js";
import StreamsBox from "../components/streamsbox.js";
import Suspensiary from "../components/suspensiary.js";
import wReducer from "../reducers/wreducer.js";

const initialStreamsObj = {
    nextStreamId: 1,
    targetedStreamId: 0,
    clickedSpurtId: 0,
    nextSpurtId: 0,
    streams: [{
        id: 0,
        dbStreamId: null,
        title: "Starter Stream",
        ableToSave: false,
        spurts: [],
        tags: [],
        createDTime: Date.now()
    }]
}


export default function WBlock({username}) {
    const [suspStreams, setSuspStreams] = useState([]);
    const [streamsObj, wDispatch] = useReducer(
        wReducer, initialStreamsObj
    );

    return (
        <div>
        <StreamsBox 
        streamsObj={streamsObj}
        dispatch={wDispatch}
        setSuspStreams={setSuspStreams}/>
        <Spurtographer 
        dispatch={wDispatch} />
        <Suspensiary
        dispatch={wDispatch}
        suspStreams={suspStreams}
        setSuspStreams={setSuspStreams} />
        </div>
    );
}

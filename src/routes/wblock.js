import { useState, useReducer, useContext } from "react";

import Spurtographer from "../components/spurtographer.js";
import StreamsBox from "../components/streamsbox.js";
import Suspensiary from "../components/suspensiary.js";
import InfoBlock from "../components/infoblock.js";
import wReducer from "../reducers/wreducer.js";

import "../styles/WBlock.css"
const initialStreamsObj = {
    nextStreamId: 1,
    targetedStreamId: 0,
    suspenSpurt: null,
    suspenStream: null,
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
        <h1 style={{textAlign: "center"}}>Writer's Block</h1>
        <div className="wblock">
        <Suspensiary
        dispatch={wDispatch}
        suspStreams={suspStreams}
        setSuspStreams={setSuspStreams} />
        <Spurtographer 
        dispatch={wDispatch} />
        <InfoBlock 
        suspenSpurt={streamsObj.suspenSpurt}
        suspenStream={streamsObj.suspenStream}
        dispatch={wDispatch}
        setSuspStreams={setSuspStreams}
        />
        </div>
        <StreamsBox 
        streamsObj={streamsObj}
        dispatch={wDispatch}
        setSuspStreams={setSuspStreams}/>
        </div>
    );
}

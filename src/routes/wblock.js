import { useState, useReducer, useContext } from "react";

import Spurtographer from "../components/spurtographer.js";
import WStream from "../components/wstream.js";
import Suspensiary from "../components/suspensiary.js";
import InfoBlock from "../components/infoblock.js";
import streamReducer from "../reducers/streamsReducer.js";

import "../styles/WBlock.css"

//const initialStreamsObj = {
    //nextStreamId: 1,
    //targetedStreamId: 0,
    //suspenSpurt: null,
    //suspenStream: null,
    //nextSpurtId: 0,
    //streams: [{
        //id: 0,
        //dbStreamId: null,
        //title: "Starter Stream",
        //ableToSave: false,
        //spurts: [],
        //tags: [],
        //createDTime: Date.now()
    //}]
//}

const initialStream = {
    id: 0,
    dbStreamId: null,
    title: "Starter Stream",
    ableToSave: false,
    spurts: [],
    tags: [],
    createDTime: Date.now()
};


export default function WBlock({username}) {
    const [openStream, openDispatch] = useReducer(
        streamReducer, initialStream
    );
    const [suspenItems, setSuspenItems] = useState([]);
    const [focusedItem, setFocusedItem] = useState(null);
    const [nextSpurtId, setNextSpurtId] = useState(0);
    const [nextStreamId, setNextStreamId] = useState(1);

    function addNewStream(e){
        openDispatch({
            type: "addStream",
            nextStreamId: nextStreamId,
        });
        setNextStreamId((prev)=>prev+1);
    }

    return (
        <div>
        <h1 style={{textAlign: "center"}}>Writer's Block</h1>
        <div className="wblock">
        <Suspensiary
        suspenItems={suspenItems}
        setFocusedItem={setFocusedItem} />
        <Spurtographer 
        openDispatch={openDispatch}
        nextStreamId={nextStreamId}
        nextSpurtId={nextSpurtId}
        setNextStreamId={setNextStreamId}
        setNextSpurtId={setNextSpurtId}
        addNewStream={addNewStream}
        />
        <InfoBlock 
        focusedItem ={focusedItem}
        setFocusedItem ={setFocusedItem}
        setSuspenItems ={setSuspenItems}
        openDispatch ={openDispatch}
        addNewStream={addNewStream}
        />
        </div>
        <WStream 
        stream={openStream}
        dispatch={openDispatch}
        setFocusedItem={setFocusedItem}
        />
        </div>
    );
}

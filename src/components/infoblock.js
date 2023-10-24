import SuspenSpurt from "./suspenspurt.js";
import SuspenSpurtEdit from "./suspenspurtedit.js";
import MinStream from "./minstream.js";

import "../styles/InfoBlock.css";
export default function InfoBlock({suspenSpurt, suspenStream, dispatch, setSuspStreams}){
    let display;
    function clearInfo(){
        dispatch({
            type: "clearinfoblock"
        });
    }
    if(suspenSpurt !== null){
        display = suspenSpurt.editState ? 
            <SuspenSpurtEdit suspenSpurt={suspenSpurt}
            dispatch={dispatch}
            />
            :
            <SuspenSpurt suspenSpurt={suspenSpurt}
            dispatch={dispatch}
            />;
    }
    else if(suspenStream !== null){
        display = <MinStream suspenStream={suspenStream} 
        dispatch={dispatch} 
        setSuspStreams={setSuspStreams}/>
    }
    else{
        display = <p style={{textAlign: "center"}}>Hi I'm Empty</p>
    }

    return (
        <div className="info-block">
        <button 
        className="info-clear-btn" 
        onClick={clearInfo}>
        Empty
        </button>
        {display}
        </div>
    );
}

import InfoSpurt from "./suspenspurt.js";
import InfoSpurtEdit from "./suspenspurtedit.js";
import InfoStream from "./infostream.js";

import "../styles/InfoBlock.css";
export default function InfoBlock({focusedItem, setFocusedItem, setSuspenItems, openDispatch, addNewStream}){
    let display;
    function clearInfo(){
        setFocusedItem(null);
    }

    function suspendOpenStream(){
        setSuspenItems((prev)=>[...prev, focusedItem.stream]);
        addNewStream();
        clearInfo();
    }

    function openSuspenStream(){
        //FUCK
    }

    if (!focusedItem){
        display = <p style={{textAlign: "center"}}>Hi I'm Empty</p>;
    }
    else{
        switch (focusedItem.type){
            case "openStream":
                display = <InfoStream
                            stream={focusedItem.stream}
                            moveStream={suspendOpenStream}
                            />
                break;
            case "suspenStream":
                display = <InfoStream
                            stream={focusedItem.stream}
                            moveStream={openSuspenStream}
                            />
                break;
            default:
                display = <p>wat</p>;
        }
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

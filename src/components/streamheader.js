import "../styles/StreamHeader.css";

export default function StreamHeader({stream, dispatch, viewMode, setViewMode, setBlindMode, setFocusedItem}){
    function cycleView(){
        setViewMode((prev)=>(prev+1) % 3);
        //0 = legato
        //1 = staccato
        //2 = occatats
    }

    function focusStream(){
        setFocusedItem({
            type: "openStream",
            stream: stream
        });
    }

    return (
        <div className="streamheader">
        <button
        className="viewmodebutton"
        onClick={cycleView}>
        Mode: {VIEW_MODE_NAMES[viewMode]}
        </button>
        <button
        className="blindbutton"
        onClick={setBlindMode}>
        Blind
        </button>
        <button
        className="focusbutton"
        onClick={focusStream}>
        Info
        </button>
        <h3 
        className="title">
        {stream.title}
        </h3>
        </div>
    );
};

const VIEW_MODE_NAMES = ["Legato","Staccato","otaccatS"];

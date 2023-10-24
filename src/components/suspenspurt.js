import "../styles/SuspenSpurt.css";
export default function SuspenSpurt({suspenSpurt, dispatch}){
    const createDTimeObj = new Date(suspenSpurt.createDTime);
    const createDTime = createDTimeObj.toLocaleString().split(",");
    const createDate = createDTime[0];
    const createTime = createDTime[1];

    function spurtDelete(){
        dispatch({
            type: "spurtdelete",
            spurt: suspenSpurt
        });
        dispatch({
            type: "clearinfoblock"
        });
    }

    function spurtEditStart(){
        dispatch({
            type: "spurteditstart"
        });
    }

    return (
        <div className="suspenspurt">
        <div className="suspenspurt-btns">
        <button onClick={spurtEditStart}>Edit</button>
        <button onClick={spurtDelete}>Delete</button>
        </div>
        <div className="suspentext">{suspenSpurt.text}</div>
        <div>{createDate}</div>
        <div>{createTime}</div>
        <div>{suspenSpurt.tSpan / 1000} seconds</div>
        </div>
    );
}

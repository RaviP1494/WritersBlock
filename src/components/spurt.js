import "../styles/Spurt.css";
export default function Spurt({spurt, spurtSelect, viewMode}){
    function handleClick(e){
        console.log(`span: ${spurt.tSpan/1000}`);
        spurtSelect(spurt);
    }

    if(viewMode === 1 || viewMode === 2){
        return (
            <>
            <div 
            className="spurt" 
            onClick={handleClick}>
            <span>{spurt.createTime} : </span>
            {spurt.text}
            </div>
            <hr/>
            </>
        );
    }else{
        return (<span className="spurt" onClick={handleClick}>{spurt.text}</span>);
    }
};

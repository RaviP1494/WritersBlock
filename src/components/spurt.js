export default function Spurt({spurt}){
    function handleClick(e){
        console.log(`span: ${spurt.tSpan/1000}`);
    }
    return (
        <span onClick={handleClick}>{spurt.text}</span>
    );
};

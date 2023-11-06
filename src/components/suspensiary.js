import "../styles/Suspensiary.css";

export default function Suspensiary({suspenItems, setFocusedItem}){
    function focusItem(item){
        setFocusedItem(item);
    }

    return (
        <div className="suspensiary">
        <h1 className="title">
        Suspensiary
        </h1>
        <div className="suspended-streams">
        { suspenItems.map((item)=> {
            return <button 
            key={item.id}
            onClick={()=>focusItem(item)}>
            {item.title}
            </button>
        })}
        </div>
        </div>
    );
};

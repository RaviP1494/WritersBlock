import Spurt from "./spurt.js";

import "../styles/SpurtsBox.css"

export default function SpurtsBox({spurts, spurtSelect, viewMode}){
    const reversedSpurts = [];
    //ottacats
    if(viewMode === 2){
        for(let i=spurts.length; i--; i>=0){
            reversedSpurts.push(spurts[i]);
        }
        spurts = reversedSpurts;
    }
    return (
        <div className="spurtsbox">
        {spurts.map((spurt)=>
            <Spurt 
            key={spurt.id}
            spurt={spurt}
            spurtSelect={spurtSelect}
            viewMode={viewMode}
            />
        )}
        </div>
    );

};

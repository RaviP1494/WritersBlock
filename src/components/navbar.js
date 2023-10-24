import { Link } from "react-router-dom";

import "../styles/NavBar.css";

export default function NavBar({username, setUsername}){
    return (
    <div className="bar">

        <span>
        <Link to = "/">
        |Home|
        </Link>
        { username && (
        <Link to = "/wblock">
            |W Block|
        </Link>
        )}
        </span>
      { username ? 
        (
      <>
      <span style={{alignSelf: "center"}}>
        {username}
      </span>
      <span>
        <Link to = "/" onClick={()=>setUsername("")}>
            |Sign Out|
        </Link>
      </span>
      </>
        ) : (

      <span>
        <Link to = "/login">
            |Login|
        </Link>
        <Link to = "/signup">
            |Sign Up|
        </Link>
      </span>
      )}

    </div>

    );
}

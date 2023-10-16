import { Link } from "react-router-dom";

import "../styles/NavBar.css";

export default function NavBar({username, setUsername}){
    return (
    <div>

        <Link to = "/">
        |Home|
        </Link>

      { username ? 
        (
      <span>
      <span>{username}</span>
        <Link to = "/wblock">
            |W Block|
        </Link>
        <Link to = "/rblock">
            |R Block|
        </Link>
        <Link to = "/" onClick={()=>setUsername("")}>
            |Sign Out|
        </Link>
      </span>

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

import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { userAtom } from "../atoms";
import { useRecoilValue } from "recoil";

function Home() {
    const user = useRecoilValue(userAtom)
    
    return (
        <div >
            {user ? <h1>Welcome, {user.display_name}</h1> :
            <div>
                <h1>Welcome! Please Login or Signup</h1>
            </div>
            }
        </div>
    )
}

export default Home
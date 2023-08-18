import React from "react";
import { userAtom, apiAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
    const [user, setUser] = useRecoilState(userAtom)
    const API = useRecoilValue(apiAtom)

    function handleLogout(){
        fetch(`${API}logout`, {
            method: "DELETE",
          })
        setUser(null)
    }

    return (
        <div >
            {user ? 
            <div>
                <Image src={user.image} size='medium' circular/>
                <h2>{user.display_name}'s profile</h2>
                <p>{user.bio}</p>
                <Button color="blue" as={NavLink} to="/editprofile" >Edit Profile</Button>
                <Button color="red" onClick={handleLogout}>Logout</Button>
            </div> : 
            <div>
                <h1>Please Login or Sign Up</h1>
            </div>}
        </div>
    )
}

export default Profile
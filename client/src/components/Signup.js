import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { newUserAtom, userAtom, apiAtom, allUsersAtom } from "../atoms";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {
    const [newUser, setNewUser] = useRecoilState(newUserAtom)
    const [user, setUser] = useRecoilState(userAtom)
    const [allUsers, setAllUsers] = useRecoilState(allUsersAtom)
    const API = useRecoilValue(apiAtom)

    function handleChange(e) {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(newUser)
        fetch(`${API}signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }).then((r) => {
            if (r.ok) {
              r.json()
              .then((user) => setUser(user))
              .then((user) => setAllUsers([...allUsers, user]))
            }
          });
        setNewUser({
            username: "",
            password: "",
            image: "",
            display_name: "",
            bio: ""
        })
    }

    return (
        <div >
            {user ? <Redirect to="/" /> :
            <div>
                <h1>Sign up</h1>
                <form onSubmit={e => handleSubmit(e)} >
                    <div className="ui input"> <input type="text" name="username" value={newUser.username} placeholder="Username" autoComplete="off" onChange={handleChange} required/> </div>
                    <div className="ui input"> <input type="password" name="password" value={newUser.password} placeholder="Password" autoComplete="off" onChange={handleChange} required/> </div>
                    <div className="ui input"> <input type="text" name="display_name" value={newUser.display_name} placeholder="Display name" onChange={handleChange} required/> </div>
                    <div className="ui input"> <input type="text" name="image" value={newUser.image} placeholder="Profile picture" onChange={handleChange}/> </div>
                    <div className="ui input"> <input type="text" name="bio" value={newUser.bio} placeholder="Bio" onChange={handleChange}/> </div>
                    <button type="submit" className="ui button">Signup</button>
                </form>
            </div>}
        </div>
    )
}

export default Signup
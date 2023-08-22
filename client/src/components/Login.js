import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { apiAtom, loginAtom, userAtom } from "../atoms";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
    const [newLogin, setNewLogin] = useRecoilState(loginAtom)
    const API = useRecoilValue(apiAtom)
    const [user, setUser] = useRecoilState(userAtom)
    const [error, setError] = useState(false)

    function handleChange(e) {
        setNewLogin({ ...newLogin, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setError(false)
        fetch(`${API}login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newLogin),
          }).then((r) => {
            if (r.ok) {
              r.json().then((user) => setUser(user));
            }
            else{
                setError(true)
            }
          })
        setNewLogin({
            username: "",
            password: ""
        })
    }

    return (
        <div >
            {user ? <Redirect to="/" /> :
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} >
                    <div className="ui input"> <input type="text" name="username" value={newLogin.username} placeholder="username" autoComplete="off" onChange={handleChange}/> </div>
                    <div className="ui input"> <input type="password" name="password" value={newLogin.password} placeholder="password" onChange={handleChange}/> </div>
                    <button type="submit" className="ui button">Login</button>
                    {error ? <div>Incorrect username and/or password</div> : <div></div> }
                </form>
            </div>}
        </div>
    )
}

export default Login
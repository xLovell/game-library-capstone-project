import React from "react";
import { useRecoilState } from "recoil";
import { loginAtom } from "../atoms";

function Login() {
    const [newLogin, setNewLogin] = useRecoilState(loginAtom)

    function handleChange(e) {
        setNewLogin({ ...newLogin, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(newLogin)
        setNewLogin({
            username: "",
            password: ""
        })
    }

    return (
        <div >
            <h1>login page</h1>
            <form onSubmit={handleSubmit} >
                <div class="ui input"> <input type="text" name="username" value={newLogin.username} placeholder="username" onChange={handleChange}/> </div>
                <div class="ui input"> <input type="password" name="password" value={newLogin.password} placeholder="password" onChange={handleChange}/> </div>
                <button type="submit" class="ui button">Login</button>
            </form>
        </div>
    )
}

export default Login
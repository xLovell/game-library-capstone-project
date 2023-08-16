import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Home() {

    return (
        <div >
            <h1>Home page</h1>
            <NavLink to="/login" exact>Login/Signup</NavLink>
        </div>
    )
}

export default Home
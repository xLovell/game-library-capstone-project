import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function NavBar(){

    return (
        <div>
            <NavLink to="/" exact>Game Library</NavLink>
            <NavLink to="/newgame" exact>Add New Game</NavLink>
            <NavLink to="/games" exact>All Games</NavLink>
            <NavLink to="/profile" exact>Profile</NavLink>
            <NavLink to="/newreview" exact>Write a Review</NavLink>
            <NavLink to="/library" exact>Library</NavLink>
        </div>
    )

}

export default NavBar
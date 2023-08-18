import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Menu, Segment, Image, Sticky } from 'semantic-ui-react'

function NavBar() {
    const [activeItem, setactiveItem] = useState("logo")
    const handleItemClick = (e, { name }) => setactiveItem(name)

    return (
        <div className="navbar">
            <Sticky>
                <Segment inverted attached size='mini'>
                    <Menu inverted secondary>
                        <Menu.Item
                            as={NavLink}
                            to="/"
                            exact
                            name='logo'
                            active={activeItem === 'logo'}
                            onClick={handleItemClick}
                        >
                            <Image src="https://www.creativefabrica.com/wp-content/uploads/2023/05/08/Video-Game-Controller-Logo-Graphics-69127373-1.png" size='tiny' circular alt="logo" />
                        </Menu.Item>
                        <Menu.Item
                            as={NavLink}
                            to="/games"
                            exact
                            name='all games'
                            active={activeItem === 'all games'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/newgame"
                            exact
                            name='add new game'
                            active={activeItem === 'add new game'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/library"
                            exact
                            name='library'
                            active={activeItem === 'library'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/profile"
                            exact
                            name='profile'
                            active={activeItem === 'profile'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/login"
                            exact
                            name='login'
                            active={activeItem === 'login'}
                            onClick={handleItemClick}
                            position="right"
                        />
                        <Menu.Item
                            as={NavLink}
                            to="/signup"
                            exact
                            name='sign up'
                            active={activeItem === 'sign up'}
                            onClick={handleItemClick}
                        />
                        {/* section */}
                    </Menu>
                </Segment>
            </Sticky>
            {/* <NavLink to="/" exact>Game Library</NavLink>
            <NavLink to="/newgame" exact>Add New Game</NavLink>
            <NavLink to="/games" exact>All Games</NavLink>
            <NavLink to="/profile" exact>Profile</NavLink>
            <NavLink to="/newreview" exact>Write a Review</NavLink>
            <NavLink to="/library" exact>Library</NavLink> */}
        </div>
    )

}

export default NavBar
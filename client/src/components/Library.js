import React, { useState, useEffect } from "react";
import LibraryGameCard from "./LibraryGameCard";
import { gamesAtom, userAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import { Card, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Library() {
    const user = useRecoilValue(userAtom)
    const games = useRecoilValue(gamesAtom)
    // const [librarySearch, setLibrarySearch] = useState("")
    // const [userGames, setUserGames] = useState([])

    // useEffect(() => {
    //     if(user){
    //         setUserGames(games.filter(g => {
    //             user.user_games.map(ug => ug.game_id === g.id)
    //         }))
    //     }
    //   }, [])

    return (
        <div >
            { user ?
            <div>
                <h1>{user.display_name}'s library</h1>
                {/* <input
                type="text"
                id="search"
                placeholder="Type a name to search..."
                onChange={(e) => setLibrarySearch(e.target.value)}
                /> */}
                <Card.Group itemsPerRow={4}>
                    {user.user_games.map(usergame => <LibraryGameCard key={usergame.game.id} usergame={usergame}/>)}
                </Card.Group>
            </div> : 
            <div>
                <h1>Please Login or Sign Up</h1>
            </div>}
        </div>
    )
}

export default Library
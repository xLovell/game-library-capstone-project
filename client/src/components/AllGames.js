import React, { useState } from "react";
import { gamesAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import GameCard from "./GameCard";
import { Card, Input } from "semantic-ui-react";

function AllGames() {
    const games = useRecoilValue(gamesAtom)
    const [gameSearch, setGameSearch] = useState("")

    return (
        <div >
            <h1>all games list</h1>
            <Input
            style={{marginBottom: "1%"}}
            focus
            type="text"
            id="search"
            placeholder="Type a name to search..."
            onChange={(e) => setGameSearch(e.target.value)}
            />
            <Card.Group itemsPerRow={5}>
                {games.filter(g => g.name.toLowerCase().startsWith(gameSearch.toLowerCase())).map(game => <GameCard key={game.id} game={game}/>)}
            </Card.Group>
        </div>
    )
}

export default AllGames
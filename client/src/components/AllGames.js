import React from "react";
import { gamesAtom } from "../atoms";
import { useRecoilValue } from "recoil";

function AllGames() {
    const games = useRecoilValue(gamesAtom)

    return (
        <div >
            <h1>all games list</h1>
            {games.map(g => <h2>{g.name}</h2>)}
        </div>
    )
}

export default AllGames
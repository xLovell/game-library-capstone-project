import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { newGameAtom, gamesAtom, apiAtom } from "../atoms";

function NewGame() {
    const [newGame, setNewGame] = useRecoilState(newGameAtom)
    const [games, setGames] = useRecoilState(gamesAtom)
    const API = useRecoilValue(apiAtom)

    function handleChange(e){
        setNewGame({ ...newGame, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`${API}games`, {
            method: "POST",
            headers:{
                Accepts: "application/json",
                "Content-type" : "application/json",
            },
            body: JSON.stringify(newGame),
        })
		.then(res => res.json())
		.then(json => setGames([...games, json]))
        setNewGame({
            name: "",
            image: ""
        })
    }

    return (
        <div >
            <h1>Add New Game</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="ui focus input"> <input type="text" name="name" value={newGame.name} placeholder="Name" autoComplete="off" onChange={handleChange} required/> </div>
                <div className="ui focus input"> <input type="text" name="image" value={newGame.image} placeholder="Image" autoComplete="off" onChange={handleChange} required/> </div>
                <button type="submit" className="ui button">Add Game</button>
            </form>
        </div>
    )
}

export default NewGame
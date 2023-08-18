import React, { useState } from "react";
import { Card, Button, Image } from 'semantic-ui-react'
import { userAtom, apiAtom, currentGameAtom } from "../atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function GameCard({ game }) {
    const [user, setUser] = useRecoilState(userAtom)
    const API = useRecoilValue(apiAtom)
    const setCurrentGame = useSetRecoilState(currentGameAtom)

    function checkUnique(){

        return(user.user_games.every(usergame => {
            if (usergame.game_id === game.id){
                return false
            }
            return true
        }))
    }

    function addToLibrary() {
        if(user){
            if(checkUnique() === true){
                fetch(`${API}usergames`, {
                    method: "POST",
                    headers:{
                        Accepts: "application/json",
                        "Content-type" : "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        game_id: game.id
                    }),
                })
                .then(res => res.json())
                .then((json) => {
                    fetch(`${API}users/${json.user_id}`)
                    .then(res => res.json())
                    .then(setUser)
                })}
            else if (checkUnique() === false){
                alert("Already added to your library!")
            }
        }
        else {
            alert("Please login or signup first")
        }
    }

    return (
        <Card >
            <Image src={game.image} wrapped ui={false} fluid/>
            <Card.Content>
                <Card.Header>{game.name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <Button onClick={addToLibrary}>
                        Add to library
                    </Button>
                    <Button as={NavLink} to='/reviews' onClick={() => setCurrentGame(game)}>
                        See Reviews
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default GameCard
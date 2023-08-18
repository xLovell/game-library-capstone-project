import React from "react";
import { Card, Button, Image } from 'semantic-ui-react'
import { apiAtom } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { currentGameAtom } from "../atoms";

function LibraryGameCard({ usergame }) {
    const API = useRecoilValue(apiAtom)
    const setUser = useSetRecoilState(userAtom)
    const setCurrentGame = useSetRecoilState(currentGameAtom)

    function deleteUserGame() {
        fetch(`${API}usergames/${usergame.id}`, {
			method:"DELETE",
		})
        fetch(`${API}users/${usergame.user_id}`)
        .then(res => res.json())
        .then(setUser)

    }

    function setGame(){
        setCurrentGame(usergame.game)
    }

    return (
        <Card >
            <Image src={usergame.game.image} wrapped ui={false} fluid/>
            <Card.Content>
                <Card.Header>{usergame.game.name}</Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <Button onClick={deleteUserGame} >
                        Remove from library
                    </Button>
                    <Button as={NavLink} to='/reviews' onClick={() => setCurrentGame(usergame.game)}>
                        See Reviews
                    </Button>
                </div>
            </Card.Content>
        </Card>
    )
}

export default LibraryGameCard
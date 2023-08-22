import React, { useEffect, useState } from "react";
import { currentGameAtom, apiAtom, allReviewsAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { NavLink, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ReviewCard from './ReviewCard';
import { Button, Card } from "semantic-ui-react";

function ReviewList() {
    const currentGame = useRecoilValue(currentGameAtom)
    const API = useRecoilValue(apiAtom)
    const [allReviews, setAllReviews] = useRecoilState(allReviewsAtom)
    const [gameReviews, setGameReviews] = useState([])

    useEffect(() => {
        fetch(`${API}reviews`)
            .then(res => res.json())
            .then(data => {
                setAllReviews(data)
            })
    }, [])

    useEffect(() => {
        setGameReviews(allReviews.filter(r => r.game_id === currentGame.id))
    }, [allReviews, currentGame])

    return (
        <div >
            <Button color="teal" className="review-button" as={NavLink} to='/newreview' >Write a review for {currentGame.name}</Button>
            {gameReviews.length > 0 ?
                <div>
                    <h1>All reviews for {currentGame.name}</h1>
                    <Card.Group>
                        {gameReviews.map(r => <ReviewCard key={r.id} review={r} />)}
                    </Card.Group>
                </div>
                :
                <h1>No reviews for {currentGame.name}</h1>
            }

        </div>
    )
}

export default ReviewList

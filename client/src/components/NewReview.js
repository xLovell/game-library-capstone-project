import React, { useState } from "react";
import { userAtom, currentGameAtom, apiAtom, allReviewsAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Form } from 'semantic-ui-react'
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewReview() {
    const user = useRecoilValue(userAtom)
    const currentGame = useRecoilValue(currentGameAtom)
    const API = useRecoilValue(apiAtom)
    const [allReviews, setAllReviews] = useRecoilState(allReviewsAtom)
    // const [newReview, setNewReview] = useState({
    //     user_id: `${user.id}`,
    //     game_id: `${currentGame.id}`,
    //     rating: "",
    //     body: ""
    // })
    const [formBody, setFormBody] = useState("")
    const [formRating, setFormRating] = useState("")
    const history = useHistory()

    function handleChange(e) {
        console.log(e.target.value)
        // setNewReview({ ...newReview, [e.target.name]: e.target.value })
        // setNewReview({ ...newReview, rating: parseInt(newReview.rating) })
    }

    function addNewReview(e) {
        e.preventDefault()
        const newReview = {
            user_id: `${user.id}`,
            game_id: `${currentGame.id}`,
            rating: formRating,
            body: formBody
        }
        setFormBody("")
        setFormRating("")
        console.log(newReview)
        fetch(`${API}reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
        })
            .then(r => r.json())
            .then((json) => {
                setAllReviews([...allReviews, json])
                history.push('/reviews')
            })

        // setNewReview({
        //     user_id: `${user.id}`,
        //     game_id: `${currentGame.id}`,
        //     rating: "",
        //     body: ""
        // })
    }

    return (
        <div >
            {user ?
                <div>
                    <h1>new review for {currentGame.name}</h1>
                    <form className="ui form" onSubmit={addNewReview}>
                        <div className="field">
                            <label>Rating 1-5</label>
                            <input type="number" name="rating" value={formRating} min="1" max="5" placeholder="Rating" onChange={(e) => setFormRating(parseFloat(e.target.value))} required />
                        </div>
                        <div className="field">
                            <label>Please write what you liked or disliked about {currentGame.name}</label>
                            <input type="text" name="body" value={formBody} autoComplete="off" placeholder="Review body text" onChange={(e) => setFormBody(e.target.value)} required />
                        </div>
                        <button type="submit" className="ui blue button" >Post New Review</button>
                    </form>
                </div> :
                <Redirect to="/profile" />
            }
        </div>
    )
}

export default NewReview
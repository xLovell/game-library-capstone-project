import React, { useEffect, useState } from "react";
import { Rating } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'

function ReviewCard({ review }) {

    return (
        <Card>
            <Card.Content>
                <Rating defaultRating={review.rating} maxRating={5} disabled />
                <Card.Meta>{review.user.display_name}</Card.Meta>
                <Card.Description>{review.body}</Card.Description>
            </Card.Content>
        </Card>
        // <div >
        //     <h1>review card</h1>
        //     <Rating defaultRating={review.rating} maxRating={5} disabled />
        //     <h1>review body: {review.body}</h1>
        //     <h1>review user: {review.user.display_name}</h1>
        // </div>
    )
}

export default ReviewCard
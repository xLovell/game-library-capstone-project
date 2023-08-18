import React, { useState } from "react";
import { Button, Form } from 'semantic-ui-react'
import { apiAtom, userAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";

function EditProfile() {
    const API = useRecoilValue(apiAtom)
    const [user, setUser] = useRecoilState(userAtom)
    const [updatedUser, setUpdatedUser] = useState({
        display_name: `${user.display_name}`,
        image: `${user.image}`,
        bio: `${user.bio}`
    })

    const history = useHistory()

    function handleChange(e) {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
    }

    function updateProfile(e) {
        e.preventDefault()
        console.log(updatedUser)
        fetch(`${API}users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        })
            .then(r => r.json())
            .then(data => {
                setUser(data)
                history.push('/profile')
            })
    }

    return (
        <div >
            <Form onSubmit={updateProfile}>
                <Form.Field>
                    <label>Display name</label>
                    <input name="display_name" placeholder={user.display_name} autoComplete="off" value={updatedUser.display_name} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Profile picture link</label>
                    <input name="image" placeholder={user.image} autoComplete="off" value={updatedUser.image} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Bio</label>
                    <input name="bio" placeholder={user.bio} autoComplete="off" value={updatedUser.bio} onChange={handleChange} />
                </Form.Field>
                <Button color="blue" type='submit' >Apply Changes</Button>
            </Form>
        </div>
    )
}

export default EditProfile
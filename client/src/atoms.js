import { atom } from "recoil";

export const apiAtom = atom({
    key: 'apiAtom',
    default: 'http://localhost:5555/'
})

export const gamesAtom = atom({
    key: 'gamesAtom',
    default: []
})

export const allUsersAtom = atom({
    key: 'allUsersAtom',
    default: []
})

export const allReviewsAtom = atom({
    key: 'allReviewsAtom',
    default: []
})

export const newGameAtom = atom({
    key: 'newGameAtom',
    default: {
        name: "",
        image: ""
    }
})

export const userAtom = atom({
    key: 'userAtom',
    default: null
})

export const currentGameAtom = atom({
    key: 'currentGameAtom',
    default: null
})

export const loginAtom = atom({
    key: 'loginAtom',
    default: {
        username: "",
        password: ""
    }
})

export const newUserAtom = atom({
    key: 'newUserAtom',
    default: {
        username: "",
        password: "",
        image: "",
        display_name: "",
        bio: ""
    }
})

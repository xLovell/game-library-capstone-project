import { atom } from "recoil";

export const gamesAtom = atom({
    key: 'gamesAtom',
    default: []
})

export const loginAtom = atom({
    key: 'loginAtom',
    default: {
        username: "",
        password: ""
    }
})
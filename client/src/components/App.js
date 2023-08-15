import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { gamesAtom } from "../atoms"
import NavBar from "./NavBar";
import NewGame from "./NewGame";
import NewReview from "./NewReview";
import AllGames from "./AllGames";
import Library from "./Library";
import Login from "./Login";
import Profile from "./Profile";
import Home from "./Home";

const API = 'http://localhost:5555/'

function App() {
	const [games, setGames] = useRecoilState(gamesAtom)

	useEffect(() => {
		fetch(`${API}games`)
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setGames(data)
		})
	}, [])

	return (
		<div>
			<h1>Game Library</h1>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/newgame">
					<NewGame />
				</Route>
				<Route exact path="/games">
					<AllGames />
				</Route>
				<Route exact path="/profile">
					<Profile />
				</Route>
				<Route exact path="/newreview">
					<NewReview />
				</Route>
				<Route exact path="/library">
					<Library />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
			</Switch>
		</div>
	)
}

export default App;

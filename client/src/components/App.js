import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { gamesAtom, userAtom, apiAtom, allReviewsAtom, allUsersAtom } from "../atoms"
import NavBar from "./NavBar";
import NewGame from "./NewGame";
import NewReview from "./NewReview";
import AllGames from "./AllGames";
import Library from "./Library";
import Login from "./Login";
import Profile from "./Profile";
import Home from "./Home";
import Signup from "./Signup";
import EditProfile from "./EditProfile";
import ReviewList from "./ReviewList";


function App() {
	const [games, setGames] = useRecoilState(gamesAtom)
	const [user, setUser] = useRecoilState(userAtom)
	const API = useRecoilValue(apiAtom)
	const setAllUsers = useSetRecoilState(allUsersAtom)

	useEffect(() => {
		fetch(`${API}games`)
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				setGames(data)
			})
		fetch(`${API}users`)
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				setAllUsers(data)
			})
		// fetch("/check_session").then((response) => {
		// 	if (response.ok) {
		// 	  response.json().then((user) => setUser(user));
		// 	}
		//   });
	}, [])

	return (
		<div>
			<NavBar />
			<div className='body'>
				<Switch >
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
					<Route exact path="/reviews">
						<ReviewList />
					</Route>
					<Route exact path="/library">
						<Library />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/editprofile">
						<EditProfile />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default App;

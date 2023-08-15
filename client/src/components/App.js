import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

const API = 'http://127.0.0.1:5555/'

function App() {
	const [games, setGames] = useState([])

	useEffect(() => {
		fetch(`${API}games`)
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			setGames(data)
		})
	}, [])

	return (
		<h1>Game Library</h1>
	)
}

export default App;

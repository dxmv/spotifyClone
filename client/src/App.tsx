import React from "react";
import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import Playbar from "./Playbar/Playbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile/Profile";

function App() {
	return (
		<>
			<div style={{ display: "flex" }}>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile/:id" element={<Profile />} />
				</Routes>
			</div>
			<Playbar />
		</>
	);
}

export default App;

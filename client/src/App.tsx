import React from "react";
import Home from "./pages/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Playbar from "./components/Playbar/Playbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";

function App() {
	return (
		<>
			<div style={{ display: "flex" }}>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</div>
			<Playbar />
		</>
	);
}

export default App;

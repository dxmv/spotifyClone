import React from "react";
import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import Playbar from "./Playbar/Playbar";
import "./App.css";

function App() {
	return (
		<>
			<div style={{ display: "flex" }}>
				<Navigation />
				<Home />
			</div>
			<Playbar />
		</>
	);
}

export default App;

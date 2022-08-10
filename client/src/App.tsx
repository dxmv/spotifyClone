import React from "react";
import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import Playbar from "./Playbar/Playbar";

function App() {
	return (
		<>
			<div>
				<Navigation />
				<Home />
			</div>
			<Playbar />
		</>
	);
}

export default App;

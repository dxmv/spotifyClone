import React from "react";
import List from "../Reusable Components/List/List";
import "./home.css";
import HomeUser from "./HomeUser";

export default function Home() {
	return (
		<div id="home">
			<HomeUser />
			{/* Image Slider */}
			{/* Following */}
			<List title="Following" list={["Andrew Tate", "Top G"]} songs={false} />
			{/* Favorite songs */}
			<List title="Favorite Songs" list={["Top G", "Top G 2"]} songs={true} />
			{/* Recently liked */}
			<List title="Recently Liked" list={["Top G", "Top G 2"]} songs={true} />
		</div>
	);
}

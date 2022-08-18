import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

export default function SearchBar() {
	return (
		<div id="search-div">
			<input
				type="text"
				id="search-bar"
				placeholder="Search by song name, artist name, playlist name ..."
			/>
			<BiSearchAlt2 id="search-icon" size={24} />
		</div>
	);
}

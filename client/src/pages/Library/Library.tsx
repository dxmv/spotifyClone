import React from "react";
import "./library.css";

export default function Library() {
	return (
		<div id="library">
			<div id="library-filter">
				<ul>
					<li className="active">Playlists</li>
					<li>Songs</li>
					<li>Albums</li>
					<li>Artists</li>
				</ul>
			</div>
			<div id="library-result"></div>
		</div>
	);
}

import React from "react";

function PlaylistList({ playlists }: { playlists: string[] }) {
	return (
		<>
			<span id="playlists">Playlists</span>
			<ul id="playlists-list">
				{playlists.map(e => (
					<li>{e}</li>
				))}
			</ul>
		</>
	);
}

export default PlaylistList;

import React from "react";

// Name of song,picture and author

export default function SongInfo() {
	return (
		<div className="song-info">
			<img
				className="song-image"
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQE4kqM739Si8UAuTrZO0ctdhMMbcBKyE-cA&usqp=CAU"
				alt="Song"
			/>
			<div>
				<span id="song-name">Top G</span>
				<span id="song-artist">Andrew Tate</span>
			</div>
		</div>
	);
}

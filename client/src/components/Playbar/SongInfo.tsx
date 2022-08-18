import React from "react";

// Name of song,picture and author

export default function SongInfo({
	songName,
	artistName,
	songImage,
}: {
	songName: string;
	artistName: string;
	songImage: string;
}) {
	return (
		<div className="song-info">
			<img className="song-image" src={songImage} alt="Song" />
			<div>
				<span id="song-name">{songName}</span>
				<span id="song-artist">{artistName}</span>
			</div>
		</div>
	);
}

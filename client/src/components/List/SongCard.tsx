import React from "react";

export default function SongCard({
	image,
	title,
	author,
}: {
	image: string;
	title: string;
	author: string;
}) {
	return (
		<div className="card song-card">
			<img src={image} alt="Song" />
			<span className="title">{title}</span>
			<span className="side">{author}</span>
		</div>
	);
}

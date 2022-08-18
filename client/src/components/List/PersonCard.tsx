import React from "react";

export default function PersonCard({
	image,
	name,
	author,
}: {
	image: string;
	name: string;
	author: boolean;
}) {
	return (
		<div className="card person-card">
			<img src={image} alt="Person" />
			<span className="title">{name}</span>
			<span className="side">{author ? "Artist" : "Profile"}</span>
		</div>
	);
}

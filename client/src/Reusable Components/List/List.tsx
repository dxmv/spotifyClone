import React from "react";
import PersonCard from "./PersonCard";
import SongCard from "./SongCard";

export default function List({
	title,
	list,
	songs,
}: {
	title: string;
	list: string[];
	songs: boolean; // True if it's a song list, false if it's a profile list
}) {
	return (
		<div className="song-list">
			<span className="title">{title}</span>
			<div style={{ display: "flex", overflow: "visible" }}>
				{list.map(e =>
					songs ? (
						<SongCard
							title={e}
							author="Andrew Tate"
							image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQE4kqM739Si8UAuTrZO0ctdhMMbcBKyE-cA&usqp=CAU"
						/>
					) : (
						<PersonCard
							image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQE4kqM739Si8UAuTrZO0ctdhMMbcBKyE-cA&usqp=CAU"
							name={e}
							author={true}
						/>
					)
				)}
			</div>
		</div>
	);
}

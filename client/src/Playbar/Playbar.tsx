import React from "react";
import Play from "./Play";
import "./playbar.css";
import SongInfo from "./SongInfo";
import VolumeLevel from "./VolumeLevel";

export default function Playbar() {
	return (
		<footer>
			<SongInfo
				songImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQE4kqM739Si8UAuTrZO0ctdhMMbcBKyE-cA&usqp=CAU"
				songName="Top G"
				artistName="Andrew Tate"
			/>
			<Play maxTime={240} />
			<VolumeLevel />
		</footer>
	);
}

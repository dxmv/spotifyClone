import React from "react";
import Play from "./Play";
import "./playbar.css";
import SongInfo from "./SongInfo";
import VolumeLevel from "./VolumeLevel";

export default function Playbar() {
	return (
		<footer>
			<SongInfo />
			<Play maxTime={240} />
			<VolumeLevel />
		</footer>
	);
}

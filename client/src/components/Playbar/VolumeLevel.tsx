import React, { useState } from "react";
import {
	BsFillVolumeUpFill,
	BsFillVolumeOffFill,
	BsFillVolumeDownFill,
} from "react-icons/bs";

// Volume

export default function VolumeLevel() {
	const [volume, setVolume] = useState<number>(70);

	return (
		<div className="volume-level">
			{volume <= 30 ? (
				<BsFillVolumeOffFill color="white" size={24} />
			) : volume >= 30 && volume <= 60 ? (
				<BsFillVolumeDownFill color="white" size={24} />
			) : (
				<BsFillVolumeUpFill color="white" size={24} />
			)}
			<input
				type="range"
				min={0}
				max={100}
				step={1}
				value={volume}
				onChange={event => {
					setVolume(event.target.valueAsNumber);
				}}
				className="slider"
			/>
		</div>
	);
}

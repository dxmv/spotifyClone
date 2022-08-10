import React, { useEffect, useState } from "react";
import {
	BiPauseCircle,
	BiSkipPreviousCircle,
	BiSkipNextCircle,
	BiPlayCircle,
} from "react-icons/bi";

// Play options

export default function Play({ maxTime }: { maxTime: number }) {
	const [time, setTime] = useState<number>(0);
	const [play, setPlay] = useState<boolean>(false);

	const playSong = async () => {
		await setPlay(prev => !prev);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ alignSelf: "center" }}>
				<BiSkipPreviousCircle color="white" size={40} className="song-button" />
				{play ? (
					<BiPauseCircle
						color="white"
						size={40}
						style={{ margin: "0px 10px" }}
						className="song-button"
						onClick={playSong}
					/>
				) : (
					<BiPlayCircle
						color="white"
						size={40}
						style={{ margin: "0px 10px" }}
						className="song-button"
						onClick={playSong}
					/>
				)}

				<BiSkipNextCircle color="white" size={40} className="song-button" />
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<span className="time-text">
					{Math.floor(time / 60)}:
					{Math.floor(time % 60) < 10
						? "0" + Math.floor(time % 60)
						: Math.floor(time % 60)}
				</span>
				<input
					type="range"
					min={0}
					max={maxTime}
					step={1}
					value={time}
					onChange={event => {
						setTime(event.target.valueAsNumber);
					}}
					className="slider"
					id="song-slider"
				/>
				<span className="time-text">
					{Math.floor(maxTime / 60)}:
					{Math.floor(maxTime % 60) < 10
						? "0" + Math.floor(maxTime % 60)
						: Math.floor(maxTime % 60)}
				</span>
			</div>
		</div>
	);
}

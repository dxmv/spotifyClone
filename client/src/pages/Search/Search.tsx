import React, { useState } from "react";
import List from "../../components/List/List";
import "./search.css";
import SearchBar from "./SearchBar";

export default function Search() {
	const [results, setResults] = useState<any[4][]>([
		["Top G"],
		[],
		["Top G"],
		[],
		[],
	]);

	return (
		<div id="search">
			<SearchBar />
			{results[0].length !== 0 ||
			results[1].length !== 0 ||
			results[2].length !== 0 ||
			results[3].length !== 0 ? (
				<div id="results">
					{results[0].length > 0 && (
						<List title="Albums" songs={true} list={results[0]} />
					)}
					{results[1].length > 0 && (
						<List title="Songs" songs={true} list={results[1]} />
					)}
					{results[2].length > 0 && (
						<List title="Artists" songs={false} list={results[2]} />
					)}
					{results[3].length > 0 && (
						<List title="Playlists" songs={true} list={results[3]} />
					)}
					{results[4].length > 0 && (
						<List title="Users" songs={false} list={results[4]} />
					)}
				</div>
			) : (
				<span id="empty-text">No results</span>
			)}
		</div>
	);
}

import React from "react";

export default function DropDownItem({
	text,
	last,
	icon,
}: {
	text: string;
	last: boolean;
	icon: JSX.Element;
}) {
	return (
		<li
			className="dropdown-item"
			style={{ borderBottom: !last ? "2px solid #0B090A" : "" }}
		>
			<span id="icon">{icon}</span>
			<span style={{ marginLeft: "5px" }}>{text}</span>
		</li>
	);
}

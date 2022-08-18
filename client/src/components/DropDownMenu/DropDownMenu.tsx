import React from "react";
import DropDownItem from "./DropDownItem";
import "../styles.css";
import { DropDownItem as DDI } from "../../types";

export default function DropDownMenu({ menu }: { menu: DDI[] }) {
	return (
		<ul className="dropdown">
			{menu.map((e, i) => (
				<DropDownItem
					text={e.text}
					icon={e.icon}
					last={i === menu.length - 1}
				/>
			))}
		</ul>
	);
}

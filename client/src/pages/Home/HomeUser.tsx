import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropDownMenu from "../../components/DropDownMenu/DropDownMenu";
import { DropDownItem } from "../../types";
import { IoPersonOutline, IoSettingsOutline, IoExit } from "react-icons/io5";

const DropDown: DropDownItem[] = [
	{
		text: "Profile",
		icon: <IoPersonOutline size={20} />,
	},
	{
		text: "Settings",
		icon: <IoSettingsOutline size={20} />,
	},
	{
		text: "Log out",
		icon: <IoExit size={20} />,
	},
];

export default function HomeUser() {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = async () => {
		await setOpen(prev => !prev);
	};

	return (
		<div className="justify-box" style={{ overflow: "visible" }}>
			<h1 style={{ fontWeight: "700" }}>Welcome</h1>
			<div id="user" onClick={handleOpen}>
				<span id="username" style={{ fontSize: "24px" }}>
					Dima
				</span>
				<MdKeyboardArrowDown size={24} color="white" />
				{open && <DropDownMenu menu={DropDown} />}
			</div>
		</div>
	);
}

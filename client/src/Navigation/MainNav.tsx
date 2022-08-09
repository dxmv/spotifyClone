import React from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";

export default function MainNav() {
	return (
		<ul id="main-nav">
			<li>
				<AiFillHome />
				<span>Home</span>
			</li>
			<li>
				<AiOutlineSearch />
				<span>Search</span>
			</li>
			<li>
				<BiLibrary />
				<span>Library</span>
			</li>
		</ul>
	);
}

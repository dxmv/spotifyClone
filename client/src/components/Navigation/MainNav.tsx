import React from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function MainNav() {
	return (
		<ul id="main-nav">
			<li>
				<AiFillHome />
				<Link to={"/"}>Home</Link>
			</li>
			<li>
				<AiOutlineSearch />
				<Link to={"/search"}>Search</Link>
			</li>
			<li>
				<BiLibrary />
				<Link to={"/library"}>Library</Link>
			</li>
		</ul>
	);
}

import "./nav.css";
import MainNav from "./MainNav";
import PlaylistList from "./PlaylistList";

export default function Navigation() {
	return (
		<nav>
			<MainNav />
			<PlaylistList playlists={["Boss", "Test", "Lofi", "Test2"]} />
			{/* <hr></hr> */}
			{/* <ul id="main-nav" style={{ marginTop: "20px" }}>
				<li>
					{" "}
					<SiAddthis /> <span>New playlist</span>
				</li>
				<li>
					<span>Favorite songs</span>
				</li>
			</ul> */}
		</nav>
	);
}

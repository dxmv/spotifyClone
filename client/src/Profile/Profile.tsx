import React from "react";
import List from "../Reusable Components/List/List";
import "./profile.css";
import UserInfo from "./UserInfo";

export default function Profile() {
	return (
		<div id="profile">
			<UserInfo />
			<div id="user-main">
				{/* All Playlists*/}
				<List
					list={["Darko Lazic", "Andrew Tate", "Darko Jevtic"]}
					songs={true}
					title="Your Playlists"
				/>
				{/* Followers */}
				<List
					list={["Darko Lazic", "Andrew Tate", "Darko Jevtic"]}
					songs={false}
					title="Followers"
				/>
				{/* Following */}
				<List
					list={["Darko Lazic", "Andrew Tate", "Darko Jevtic"]}
					songs={false}
					title="Following"
				/>
			</div>
		</div>
	);
}

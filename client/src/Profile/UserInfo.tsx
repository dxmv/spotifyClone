import React from "react";

const PICTURE =
	"https://upload.wikimedia.org/wikipedia/commons/e/e2/Portrait_of_Niccol%C3%B2_Machiavelli_by_Santi_di_Tito.jpg";

export default function UserInfo() {
	return (
		<div id="user-info">
			<img src={PICTURE} alt="Pfp" id="user-pfp" />
			<div id="user-text">
				<span className="lean-text">PROFILE</span>
				<h1 id="username">Dima</h1>
				<div>
					<span className="lean-text" style={{ marginRight: "10px" }}>
						1 Follower
					</span>
					<span className="lean-text">1 Following</span>
				</div>
			</div>
		</div>
	);
}

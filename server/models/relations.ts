import user, { follow } from "./user";
import song from "./song";
import playlist, { playlistSongs } from "./playlist";

const relations = () => {
	// User => Tracks
	user.hasMany(song, {
		foreignKey: "userId",
		as: "songs",
	});
	song.belongsTo(user, { foreignKey: "userId", as: "user" });

	// User => Follow <= User
	user.belongsToMany(user, {
		as: "followedBy",
		through: follow,
		foreignKey: "followedById",
	});
	user.belongsToMany(user, {
		as: "following",
		through: follow,
		foreignKey: "followingId",
	});

	// Playlist => PlaylistsSongs <= Songs
	playlist.belongsToMany(song, {
		through: playlistSongs,
		as: "songs",
		foreignKey: "playlistId",
	});
	song.belongsToMany(playlist, {
		through: playlistSongs,
		as: "playlists",
		foreignKey: "songId",
	});
};

export default relations;

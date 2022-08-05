import user, { follow, favoritePlaylists } from "./user";
import song from "./song";
import playlist, { playlistSongs } from "./playlist";

const relations = () => {
	// User created songs
	user.hasMany(song, {
		foreignKey: "userId",
		as: "songs",
	});
	song.belongsTo(user, { foreignKey: "userId", as: "user" });

	// User created playlist
	user.hasMany(playlist, { foreignKey: "creatorId", as: "createdPlaylists" });
	playlist.belongsTo(user, { foreignKey: "creatorId", as: "creator" });

	// User Favorite Playlists
	user.belongsToMany(playlist, {
		as: "favoritePlaylists",
		through: favoritePlaylists,
		foreignKey: "userId",
	});
	playlist.belongsToMany(user, {
		as: "favoriteBy",
		through: favoritePlaylists,
		foreignKey: "playlistId",
	});

	// Following
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

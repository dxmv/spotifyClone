import playlist, { playlistSongs } from "../models/playlist";
import song from "../models/song";

const getAllPlaylists = async () =>
	await playlist.findAll({ include: "songs" });

const getPlaylistById = async (id: string) =>
	await playlist.findByPk(id, { include: "songs" });

const createPlaylist = async (name: string, description: string) => {
	if (!playlist.findOne({ where: { name: name } })) {
		throw new Error(`Playlist with name \'${name}\' already exists`);
	}
	return await playlist.create({ name: name, description: description });
};

const addSong = async (playlistId: string, songId: string) => {
	if (!playlist.findByPk(playlistId)) {
		throw new Error(`Playlist with id \'${playlistId}\' doesn't exist exists`);
	}
	if (!song.findByPk(songId)) {
		throw new Error(`Song with id \'${songId}\' doesn't exist exists`);
	}
	playlistSongs.create({ playlistId: playlistId, songId: songId });
	return await getPlaylistById(playlistId);
};

const removeSong = async (playlistId: string, songId: string | undefined) => {
	if (!song.findByPk(songId)) {
		throw new Error(`Song with id \'${songId}\' doesn't exist exists`);
	}
	await playlistSongs.destroy({ where: { songId: songId } });
	return await getPlaylistById(playlistId);
};

const deletePlaylist = async (id: string) => {
	await playlist.destroy({ where: { playlistId: id } });
	await playlistSongs.destroy({ where: { playlistId: id } });
};

export default {
	getAllPlaylists,
	getPlaylistById,
	createPlaylist,
	addSong,
	removeSong,
	deletePlaylist,
};

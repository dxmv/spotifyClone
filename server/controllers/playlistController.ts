import playlist, { playlistSongs } from "../models/playlist";
import song from "../models/song";
import { favoritePlaylists } from "../models/user";
import deleteImage from "../utils/deleteImage";

const getAllPlaylists = async () =>
	await playlist.findAll({ include: ["songs", "creator"] });

const getPlaylistById = async (id: string) =>
	await playlist.findByPk(id, { include: ["songs", "creator"] });

const createPlaylist = async (
	name: string,
	description: string,
	userId: number,
	fileName?: string
) => {
	if (!playlist.findOne({ where: { name: name } })) {
		throw new Error(`Playlist with name \'${name}\' already exists`);
	}
	if (fileName) {
		return await playlist.create({
			name: name,
			description: description,
			creatorId: userId,
			image: fileName,
		});
	}
	return await playlist.create({
		name: name,
		description: description,
		creatorId: userId,
	});
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
	await playlistSongs.destroy({
		where: { songId: songId, playlistId: playlistId },
	});
	return await getPlaylistById(playlistId);
};

const deletePlaylist = async (id: string) => {
	await playlist.destroy({ where: { playlistId: id } });
	await playlistSongs.destroy({ where: { playlistId: id } });
	await favoritePlaylists.destroy({ where: { playlistId: id } });
};

const changePlaylistImage = async (
	id: number,
	userId: number,
	image: string
) => {
	const playlist = await getPlaylistById(id.toString());
	if (!playlist) {
		throw new Error(`Playlist with id ${id} doesn't exist`);
	}
	if (playlist.getDataValue("creatorId") != userId) {
		throw new Error("You can't edit this playlist");
	}
	await deleteImage(playlist.getDataValue("image"), "playlistImages");
	await playlist.setAttributes({ image: image });
	await playlist.save();
	return playlist;
};

export default {
	getAllPlaylists,
	getPlaylistById,
	createPlaylist,
	addSong,
	removeSong,
	deletePlaylist,
	changePlaylistImage,
};

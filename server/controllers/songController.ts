import { Model } from "sequelize";
import bcrypt from "bcrypt";
import song from "../models/song";
import user from "../models/user";

const createSong = async (
	songFile: string | undefined,
	name: string,
	userId: number
) => {
	const exists = await user.findByPk(userId);
	if (!exists) {
		throw new Error(`User with id ${userId} doesn't exist`);
	}
	return await song.create({ name: name, song: songFile, userId: userId });
};

const addImageToSong = async (
	songId: string | undefined,
	filename: string | undefined,
	userId: number
) => {
	const newSong = await getSongById(songId);
	if (!newSong) {
		throw new Error("Song with that id doesn't exist");
	}
	if (newSong.getDataValue("userId") !== userId) {
		throw new Error("You aren't the author of the song");
	}
	newSong?.setAttributes({ image: filename });
	await newSong?.save();
	return newSong;
};

const changeSongName = async (
	songId: string | undefined,
	name: string | undefined,
	userId: number
) => {
	const newSong = await getSongById(songId);
	if (!newSong) {
		throw new Error("Song with that id doesn't exist");
	}
	if (newSong.getDataValue("userId") !== userId) {
		throw new Error("You aren't the author of the song");
	}
	newSong?.setAttributes({ name: name });
	await newSong?.save();
	return newSong;
};

const getAllSongs = async () =>
	await song.findAll({ include: ["user", "likes"] });

const getSongById = async (songId: string | undefined) =>
	await song.findByPk(songId, { include: ["user", "likes"] });

export default {
	createSong,
	getAllSongs,
	addImageToSong,
	changeSongName,
	getSongById,
};

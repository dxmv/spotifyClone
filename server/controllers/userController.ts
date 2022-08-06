import { Model } from "sequelize";
import user, { follow, favoritePlaylists, favoriteSongs } from "../models/user";
import bcrypt from "bcrypt";
import deleteImage from "../utils/deleteImage";

const validEmail = (email: string): boolean => {
	// If it has '@'
	if (!email.includes("@")) {
		return false;
	}

	// Ends in '.com'
	if (!email.endsWith(".com")) {
		return false;
	}

	// The part before '@' is appropriate length
	const firstPart = email.split("@")[0];
	if (!firstPart) {
		return false;
	}
	if (firstPart.length < 2) {
		return false;
	}

	return true;
};

const getAllUsers = async (): Promise<Model<any, any>[]> =>
	await user.findAll({
		include: [
			"songs",
			"followedBy",
			"following",
			"createdPlaylists",
			"favoritePlaylists",
			"favoriteSongs",
		],
	});

const getUserById = async (
	id: number
): Promise<Model<any, any> | undefined | null> =>
	await user.findByPk(id, {
		include: [
			"songs",
			"followedBy",
			"following",
			"createdPlaylists",
			"favoritePlaylists",
			"favoriteSongs",
		],
	});

const createUser = async (
	username: string,
	email: string,
	password: string,
	image: string | undefined
): Promise<Model<any, any>> => {
	// Email check
	if (!validEmail(email)) {
		throw new Error("Invalid email!");
	}

	// Password check
	if (password.length < 8) {
		throw new Error("Invalid password!");
	}

	// Check if there is a user with a same username
	if (await user.findOne({ where: { username: username } })) {
		throw new Error("Username not available!");
	}

	// Check if there is a user with a same email
	if (await user.findOne({ where: { email: email } })) {
		throw new Error("Email not available!");
	}

	const newPassword = await bcrypt.hashSync(password, 10);
	let result;
	if (image) {
		result = await user.build({
			username,
			email,
			password: newPassword,
			profilePicture: image,
		});
	} else {
		result = await user.build({ username, email, password: newPassword });
	}
	await result.save();
	return result;
};

const changePassword = async (id: number, password: string) => {
	const newPassword = await bcrypt.hash(password, 10);
	await user.update({ password: newPassword }, { where: { userId: id } });
	return await getUserById(id);
};

const makeAuthor = async (id: number) => {
	await user.update({ isAuthor: true }, { where: { id: id } });
	return await getUserById(id);
};

const followUser = async (first: number, second: number) => {
	follow.create({ followedById: second, followingId: first });
	return await getUserById(first);
};

const changePicture = async (filename: string, userId: number) => {
	const current = await getUserById(userId);
	deleteImage(current?.getDataValue("profilePicture"), "users");
	current?.setAttributes({ profilePicture: filename });
	await current?.save();
	return current;
};

const changeUser = async (id: number, username: string, email: string) => {
	if (!validEmail(email)) {
		throw new Error("Invalid email!");
	}
	await user.update(
		{ username: username, email: email },
		{ where: { userId: id } }
	);
	return await getUserById(id);
};

const addFavoritePlaylist = async (userId: number, playlistId: number) => {
	await favoritePlaylists.create({ userId: userId, playlistId: playlistId });
	return await getUserById(userId);
};

const removeFavoritePlaylist = async (userId: number, playlistId: number) => {
	await favoritePlaylists.destroy({
		where: { userId: userId, playlistId: playlistId },
	});
	return await getUserById(userId);
};

const likeSong = async (userId: number, songId: number) => {
	await favoriteSongs.create({ userId: userId, songId: songId });
	return await getUserById(userId);
};

const dislikeSong = async (userId: number, songId: number) => {
	await favoriteSongs.destroy({ where: { userId: userId, songId: songId } });
	return await getUserById(userId);
};

export default {
	getAllUsers,
	getUserById,
	createUser,
	changePassword,
	makeAuthor,
	followUser,
	changePicture,
	changeUser,
	addFavoritePlaylist,
	removeFavoritePlaylist,
	likeSong,
	dislikeSong,
};

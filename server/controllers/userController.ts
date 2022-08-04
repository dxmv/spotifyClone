import { Model } from "sequelize";
import user, { follow } from "../models/user";
import bcrypt from "bcrypt";
import fsPromises from "fs/promises";

const getAllUsers = async (): Promise<Model<any, any>[]> =>
	await user.findAll({ include: ["songs", "followedBy", "following"] });

const getUserById = async (
	id: string
): Promise<Model<any, any> | undefined | null> =>
	await user.findByPk(id, { include: ["songs", "followedBy", "following"] });

const createUser = async (
	username: string,
	email: string,
	password: string,
	image: string | undefined
): Promise<Model<any, any>> => {
	// Check if email is valid
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

const changePassword = async (id: string, password: string) => {
	const newPassword = await bcrypt.hash(password, 10);
	await user.update({ password: newPassword }, { where: { userId: id } });
	return await getUserById(id);
};

const makeAuthor = async (id: string) => {
	await user.update({ isAuthor: true }, { where: { id: id } });
	return await getUserById(id);
};

const followUser = async (first: string, second: string) => {
	follow.create({ followedById: second, followingId: first });
	return await getUserById(first);
};

const changePicture = async (filename: string, userId: string) => {
	const deleteImage = async (oldImage: string) => {
		const path = `D:\\JAVA SCRIPT PROJECTS\\Spotify Clone\\server\\static\\users\\${oldImage}`;
		await fsPromises.unlink(path);
	};

	const current = await getUserById(userId);
	deleteImage(current?.getDataValue("profilePicture"));
	current?.setAttributes({ profilePicture: filename });
	await current?.save();
	return current;
};

export default {
	getAllUsers,
	getUserById,
	createUser,
	changePassword,
	makeAuthor,
	followUser,
	changePicture,
};

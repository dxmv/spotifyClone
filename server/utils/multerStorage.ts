import multer from "multer";

const filename = (req: any, file: Express.Multer.File, callback: any) => {
	callback(null, Date.now() + "." + file.originalname.split(".").pop());
};

export const userStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./static/users/");
	},
	filename: filename,
});

export const songImageStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./static/songImages/");
	},
	filename: filename,
});

export const playlistImageStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./static/playlistImages/");
	},
	filename: filename,
});

export const songStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./static/songs/");
	},
	filename: filename,
});

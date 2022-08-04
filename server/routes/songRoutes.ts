import { Router } from "express";
import songController from "../controllers/songController";
import multer from "multer";
import { songImageStorage, songStorage } from "../utils/multerStorage";

export const route = Router();
const uploadImage = multer({
	storage: songImageStorage,
	fileFilter: (req, file, callback) => {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
		) {
			callback(null, true);
		}
		callback(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

const uploadSong = multer({
	storage: songStorage,
	fileFilter: (req, file, callback) => {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
		) {
			callback(null, true);
		}
		callback(null, true);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

// Get all songs
route.get("/", async (req, res) => {
	try {
		const songs = await songController.getAllSongs();
		res.status(200).json(songs);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Get song
route.get("/:id", async (req, res) => {
	try {
		const song = await songController.getSongById(req.params.id);
		if (!song) {
			res.status(404).json("Song with that id doesn't exist");
		}
		res.status(200).json(song);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Create a song
route.post("/", uploadSong.single("song"), async (req, res) => {
	try {
		const song = await songController.createSong(
			req.file?.filename,
			req.body.name,
			"1"
		);
		res.status(202).json(song);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Add image to song
route.post(
	"/addImage/:id",
	uploadImage.single("songImage"),
	async (req, res) => {
		try {
			const song = await songController.addImageToSong(
				req.params.id,
				req.file?.filename
			);
			res.status(202).json(song);
		} catch (e) {
			const message = (e as Error).message;
			res.status(400).json(message);
		}
	}
);

// Change name
route.patch("/changeName/:id", async (req, res) => {
	try {
		const song = await songController.changeSongName(
			req.params.id,
			req.body.name
		);
		res.status(202).json(song);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

import { Router } from "express";
import passport from "passport";
import playlistController from "../controllers/playlistController";
import multer from "multer";

export const route = Router();

import { playlistImageStorage } from "../utils/multerStorage";

const upload = multer({
	storage: playlistImageStorage,
	fileFilter: (req, file, callback) => {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
		) {
			callback(null, true);
		}
		callback(null, false);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

// Get all playlists
route.get("/", async (req, res) => {
	try {
		const playlists = await playlistController.getAllPlaylists();
		res.status(200).json(playlists);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Get playlist by Id
route.get("/:id", async (req, res) => {
	try {
		const playlist = await playlistController.getPlaylistById(req.params.id);
		res.status(200).json(playlist);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Create playlist
route.post(
	"/",
	upload.single("playlistImage"),
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const playlist = await playlistController.createPlaylist(
				req.body.name,
				req.body.description,
				req.user.dataValues.userId,
				req.file?.filename
			);
			res.status(200).json(playlist);
		} catch (e) {
			const message = (e as Error).message;
			res.status(400).json(message);
		}
	}
);

// Change playlist image
route.patch(
	"/changePlaylistImage/:id",
	upload.single("playlistImage"),
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const playlist = await playlistController.changePlaylistImage(
				Number(req.params.id),
				req.user.dataValues.userId,
				req.file?.filename || "default.jpg"
			);
			res.status(200).json(playlist);
		} catch (e) {
			const message = (e as Error).message;
			res.status(400).json(message);
		}
	}
);

// Add songs to playlist
route.patch("/:id", async (req, res) => {
	try {
		const playlist = await playlistController.addSong("1", req.params.id);
		res.status(200).json(playlist);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Remove song from playlist
route.patch("/removeSong/:id", async (req, res) => {
	try {
		const playlist = await playlistController.removeSong("1", req.params.id);
		res.status(200).json(playlist);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Delete playlist
route.delete("/:id", async (req, res) => {
	try {
		await playlistController.deletePlaylist(req.params.id);
		res.status(200).json("Successfully deleted");
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

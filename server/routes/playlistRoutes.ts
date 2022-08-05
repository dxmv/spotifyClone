import { Router } from "express";
import playlistController from "../controllers/playlistController";

export const route = Router();

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
route.post("/", async (req, res) => {
	try {
		const playlist = await playlistController.createPlaylist(
			req.body.name,
			req.body.description
		);
		res.status(200).json(playlist);
	} catch (e) {
		const message = (e as Error).message;
		res.status(400).json(message);
	}
});

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

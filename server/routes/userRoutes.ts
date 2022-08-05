import { Router } from "express";
import userController from "../controllers/userController";
import multer from "multer";
import { userStorage } from "../utils/multerStorage";
import passport from "passport";

export const route = Router();

const upload = multer({
	storage: userStorage,
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

// Get all users
route.get("/", async (req, res) => {
	try {
		const users = await userController.getAllUsers();
		res.status(200).json(users);
	} catch (e) {
		res.status(400).json(e);
	}
});

// Get user by id
route.get("/:id", async (req, res) => {
	try {
		const user = await userController.getUserById(req.params.id);
		res.status(200).json(user);
	} catch (e) {
		res.status(400).json(e);
	}
});

// route.get("/songs/", async (req, res) => {
// 	try {
// 		const user = await userController.getUserById(req.params.id);
// 		res.status(200).json(user);
// 	} catch (e) {
// 		res.status(400).json(e);
// 	}
// });

// Create user
route.post("/", upload.single("profilePicture"), async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = await userController.createUser(
			username,
			email,
			password,
			req.file?.filename
		);
		res.status(202).json(user);
	} catch (e) {
		let message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Change profile
// route.put("/:id", async (req, res) => {
// 	try {
// 		// If the current user isn't with this id exit

// 	} catch (e) {
// 		let message = (e as Error).message;
// 		res.status(400).json(message);
// 	}
// });

// Change PFP
route.patch(
	"/changeProfilePicture/",
	upload.single("profilePicture"),
	async (req, res) => {
		try {
			const user = await userController.changePicture(
				req.file?.filename || "",
				"1"
			);
			res.status(202).json(user);
		} catch (e) {
			let message = (e as Error).message;
			res.status(400).json(message);
		}
	}
);

// Reset password request
// route.patch("/resetPassword/:id", async (req, res) => {
// 	try {
// 		const { password } = req.body;
// 		const user = await userController.changePassword(req.params.id, password);
// 		res.status(202).json(user);
// 	} catch (e) {
// 		let message = (e as Error).message;
// 		res.status(400).json(message);
// 	}
// });

// Change password
route.patch("/changePassword/:id", async (req, res) => {
	try {
		const { password } = req.body;
		const user = await userController.changePassword(req.params.id, password);
		res.status(202).json(user);
	} catch (e) {
		let message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Make user an author
route.patch("/makeAuthor/:id", async (req, res) => {
	try {
		const user = await userController.makeAuthor(req.params.id);
		res.status(202).json(user);
	} catch (e) {
		let message = (e as Error).message;
		res.status(400).json(message);
	}
});

// Follow another user
route.patch(
	"/follow/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			console.log(req.user);
			if (req.params.id === req.user) {
				res.status(404).json("You cannot follow yourself");
			}
			const user = await userController.followUser("1", req.params.id);
			res.status(202).json(user);
		} catch (e) {
			let message = (e as Error).message;
			res.status(400).json(message);
		}
	}
);

import { Router } from "express";
import passport from "passport";
import notificationController from "../controllers/notificationController";

export const route = Router();

route.get("/", async (req, res) => {
	try {
		const notifications = await notificationController.getAll();
		res.status(200).json(notifications);
	} catch (e) {
		const msg = (e as Error).message;
		res.status(400).json({ msg: msg });
	}
});

route.patch(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const notifications = await notificationController.visitNotification(
				req.user.dataValues.userId,
				Number(req.params.id)
			);
			res.status(200).json(notifications);
		} catch (e) {
			const msg = (e as Error).message;
			res.status(400).json({ msg: msg });
		}
	}
);

route.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const notifications = await notificationController.deleteNotifications(
				req.user.dataValues.userId
			);
			res.status(200).json({ msg: "Deleted successfully" });
		} catch (e) {
			const msg = (e as Error).message;
			res.status(400).json({ msg: msg });
		}
	}
);

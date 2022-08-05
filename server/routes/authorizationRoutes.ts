import { Router } from "express";
import user from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const route = Router();

route.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const currentUser = await user.findOne({ where: { username: username } });
		if (
			!currentUser ||
			!(await bcrypt.compare(password, currentUser?.getDataValue("password")))
		) {
			res.status(402).json({ msg: `Username or password invalid` });
		}
		const token = jwt.sign(
			{ id: currentUser?.getDataValue("userId"), username: username },
			process.env.JWT_SECRET || "secret",
			{ expiresIn: "1d" }
		);
		res.status(202).json({ token: `Bearer ${token}` });
	} catch (e) {
		const msg = (e as Error).message;
		res.status(400).json({ msg: msg });
	}
});

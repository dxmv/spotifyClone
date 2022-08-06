import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";

import { route as userRoute } from "./routes/userRoutes";
import { route as songRoute } from "./routes/songRoutes";
import { route as playlistRoute } from "./routes/playlistRoutes";
import { route as authRoute } from "./routes/authorizationRoutes";

import db from "./utils/connection";
import relations from "./models/relations";

// Config
dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Passport
app.use(passport.initialize());
require("./utils/passportConfig");

// Check if db is working
db.authenticate()
	.then(() => console.log("Database Working"))
	.catch(e => console.log(e));
db.sync({ force: true });
relations();

// Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/songs", songRoute);
app.use("/playlists", playlistRoute);

// Listen
app.listen(port, () => {
	console.log(`Server is running at https://localhost:${port}`);
});

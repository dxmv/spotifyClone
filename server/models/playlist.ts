import { DataTypes } from "sequelize";
import db from "../utils/connection";

const playlist = db.define(
	"Playlist",
	{
		playlistId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		tableName: "playlists",
	}
);

export const playlistSongs = db.define(
	"PlaylistsSongs",
	{},
	{ timestamps: false }
);

export default playlist;

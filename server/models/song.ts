import { DataTypes } from "sequelize";
import db from "../utils/connection";

const song = db.define(
	"Song",
	{
		songId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// likes: {
		// 	type: DataTypes.INTEGER,
		// 	defaultValue: 0,
		// },
		song: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			defaultValue: "default.jpg",
		},
	},
	{
		freezeTableName: true,
		tableName: "songs",
	}
);

export default song;

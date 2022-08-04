import { DataTypes } from "sequelize";
import db from "../utils/connection";

const user = db.define(
	"User",
	{
		userId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			unique: true,
		},
		profilePicture: {
			type: DataTypes.STRING,
			defaultValue: "default.jpg",
		},
		isAuthor: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
		tableName: "users",
	}
);

export const follow = db.define("Follow", {}, { timestamps: false });

export default user;

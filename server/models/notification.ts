import { DataTypes } from "sequelize";
import db from "../utils/connection";

const notification = db.define(
	"Notification",
	{
		notiId: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		visited: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
		tableName: "notifications",
	}
);

export default notification;

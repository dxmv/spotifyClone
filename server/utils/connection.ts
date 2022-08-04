import { Pool } from "pg";
import { Sequelize } from "sequelize";

const pool = new Pool({
	user: process.env.USER,
	host: process.env.HOST,
	database: process.env.DB,
	password: process.env.PASSWORD,
	port: 5432,
});

const db = new Sequelize("API", "postgres", "dima", {
	host: "localhost",
	dialect: "postgres",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	logging: false,
});

export default db;

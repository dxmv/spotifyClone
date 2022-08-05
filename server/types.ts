import { Request } from "express";
export interface CustomRequest extends Request {
	user?: {
		dar: string;
	};
}

export interface User {
	userId: number;
	username: string;
	email: string;
	password: string;
	profilePicture: string;
}

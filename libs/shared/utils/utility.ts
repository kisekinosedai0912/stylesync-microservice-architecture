import { envSchema } from "../types/env";
import jwt from "jsonwebtoken";
import { Response } from "express";

export function getEnv() {
	const envData = envSchema.safeParse(process.env);
	if (!envData.success) {
		throw new Error(
			`Environment variables are invalid: ${envData.error.message}`,
		);
	}
	return envData.data;
}

export async function generateJWT(userId: string, res: Response) {
	const env = getEnv();
	const jwtToken = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "3h" });

	return res.cookie("jwt", jwtToken, {
		maxAge: 3 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: false,
	});
}

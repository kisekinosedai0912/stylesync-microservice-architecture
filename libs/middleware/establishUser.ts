import type { Request, Response, NextFunction } from "express";
import type { Role } from "@stylesync/types";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
	const userId = req.headers["x-user-id"];
	const role = req.headers["x-user-role"];

	if (!userId || !role) {
		res.status(403).json({
			message: "Unauthenticated request",
		});
	}

	req.user = {
		id: String(userId),
		role: role as Role,
	};
	next();
}

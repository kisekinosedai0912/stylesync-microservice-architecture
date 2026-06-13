import { users, roles } from "@stylesync/storage/db";
import { getDb } from "@stylesync/db";
import { getEnv } from "@stylesync/utils";
import { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "@stylesync/types";
import jwt from "jsonwebtoken";
import { eq } from "@stylesync/orm";

export async function routeGuard(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			res.status(401).json({
				message: "Unauthorized: no token access provided!",
			});
			return;
		}

		const env = getEnv();
		const { db } = getDb();

		const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
		if (!payload) {
			res.status(401).json({
				message: "Unauthorized: malformed/invalid token",
			});
			return;
		}

		const userWithRole = await db
			.select()
			.from(users)
			.leftJoin(roles, eq(users.roleId, roles.id))
			.where(eq(users.id, payload.userId));

		if (userWithRole.length === 0) {
			res.status(404).json({ message: "Unauthorized: User not found" });
			return;
		}

		req.user = { id: payload.userId, role: payload.role };
		next();
	} catch (error) {
		console.error("Error in routeGuard:", error);
		res.status(401).json({ message: "Unauthorized: Invalid token" });
		return;
	}
}

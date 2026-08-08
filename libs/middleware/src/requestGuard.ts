import { getEnv } from "@stylesync/utils";
import { Request, Response, NextFunction } from "express";
import { jwtPayloadSchema } from "@stylesync/types";
import jwt from "jsonwebtoken";

export async function gatewayGuard(
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
        const payload = jwt.verify(token, env.JWT_SECRET);
        const parsedPayload = jwtPayloadSchema.safeParse(payload);

        if (!parsedPayload.success) {
            res.status(401).json({
                message: "Unauthorized: malformed/invalid token",
            });
            return;
        }

        req.user = {
            id: parsedPayload.data.userId,
            role: parsedPayload.data.role,
        };
        next();
    } catch (error) {
        console.error("Error in routeGuard:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
    }
}

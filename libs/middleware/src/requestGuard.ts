import { Request, Response, NextFunction } from "express";
import { jwtPayloadSchema } from "@stylesync/types";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error(
            "JWT_SECRET is not configured in the API gateway environment",
        );
    }
    return secret;
}

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

        const payload = jwt.verify(token, getJwtSecret());
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
        const message =
            error instanceof Error && error.message.includes("JWT_SECRET")
                ? "Unauthorized: auth configuration error"
                : "Unauthorized: Invalid token";
        res.status(401).json({ message });
        return;
    }
}

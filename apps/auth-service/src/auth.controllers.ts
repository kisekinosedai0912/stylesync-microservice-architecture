import { asyncHandler, AppError } from "@stylesync/middleware";
import { generateJWT } from "@stylesync/utils";
import { ok, created } from "@stylesync/api";
import { RequestHandler, Request, Response } from "express";
import { signupSchema, loginSchema } from "./auth.types";
import { authService } from "../services/auth.services";

export const signup: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const signupPayload = signupSchema.safeParse(req.body);
        if (!signupPayload.success) {
            throw new AppError(400, signupPayload.error.message);
        }

        const { newUser, userRole } = await authService.signup(
            signupPayload.data,
        );

        await generateJWT(newUser.id, userRole, res);

        return created(res, "User signup successful", newUser);
    },
);

export const login: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const loginPayload = loginSchema.safeParse(req.body);
        if (!loginPayload.success) {
            throw new AppError(400, "Authentication failed.");
        }

        const authenticatedUser = await authService.login(loginPayload.data);
        await generateJWT(authenticatedUser.id, authenticatedUser.role, res);

        return ok(res, "Login successful!", authenticatedUser);
    },
);

export const logout: RequestHandler = asyncHandler(
    async (req: Request, res: Response) => {
        res.cookie("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "strict",
            secure: false,
        });

        return ok(res, "User logged out successfully", {});
    },
);

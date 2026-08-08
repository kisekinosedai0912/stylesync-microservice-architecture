import { asyncHandler, AppError } from "@stylesync/middleware";
import { generateJWT } from "@stylesync/utils";
import { ok, created } from "@stylesync/api";
import { RequestHandler, Request, Response } from "express";
import { signupSchema, loginSchema } from "./auth.types";
import { authService } from "../services/auth.services";
import { Role } from "@stylesync/types";

type RoleConfig = {
	id: string;
	role: Role;
};

const ROLES = {
	staff: {
		id: "051763c4-db06-44db-9316-92ba9b055ece",
		role: "staff",
	},
	admin: {
		id: "76df4b94-b14e-44b9-b5f2-4a03469d8405",
		role: "admin",
	},
} as const satisfies Record<Role, RoleConfig>;
const DEFAULT_SIGNUP_ROLE = ROLES.staff;

export const signup: RequestHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const signupPayload = signupSchema.safeParse(req.body);
		if (!signupPayload.success) {
			throw new AppError(400, signupPayload.error.message);
		}

		const newUser = await authService.signup(signupPayload.data);
		await generateJWT(newUser.id, DEFAULT_SIGNUP_ROLE.role, res);

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
		res.cookie("jwt", "", { maxAge: 0 });

		return ok(res, "User logged out successfully", {});
	},
);

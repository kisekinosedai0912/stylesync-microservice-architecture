import { eq, or } from "@stylesync/orm";
import { users, roles } from "@stylesync/storage/db";
import { getDb } from "@stylesync/db";
import { asyncHandler, AppError } from "@stylesync/middleware";
import { generateJWT } from "@stylesync/utils";
import { ok, created } from "@stylesync/response";
import { RequestHandler, Request, Response } from "express";
import bcrypt from "bcrypt";
import { signupSchema, loginSchema } from "./auth.types";

export const signup: RequestHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const signinPayload = signupSchema.safeParse(req.body);
		if (!signinPayload.success) {
			throw new AppError(400, signinPayload.error.message);
		}

		const { db } = getDb();
		const { username, password, email, fullname } = signinPayload.data;

		const [userDataExist] = await db
			.select()
			.from(users)
			.where(or(eq(users.username, username), eq(users.email, email)));

		if (!userDataExist) {
			throw new AppError(409, "User or Email already exists");
		}

		const [defaultRole] = await db
			.select()
			.from(roles)
			.where(eq(roles.role, "staff"))
			.limit(1);

		if (!defaultRole) {
			throw new AppError(500, "Role provided is not found");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const [newUser] = await db
			.insert(users)
			.values({
				username,
				password: hashedPassword,
				email,
				fullname,
				roleId: defaultRole.id,
			})
			.returning();

		if (!newUser) {
			throw new AppError(500, "Signup failure: failed to create user ");
		}

		await generateJWT(newUser.id, defaultRole.role, res);
		const { password: _pw, ...userData } = newUser;

		return created(res, "User signup successful", userData);
	},
);

export const login: RequestHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const loginPayload = loginSchema.safeParse(req.body);
		if (!loginPayload.success) {
			throw new AppError(400, "Authentication failed.");
		}

		const { db } = getDb();
		const { username, password } = loginPayload.data;

		const [account] = await db
			.select({
				id: users.id,
				username: users.username,
				email: users.email,
				fullname: users.fullname,
				password: users.password,
				role: roles.role,
			})
			.from(users)
			.leftJoin(roles, eq(users.roleId, roles.id))
			.where(eq(users.username, username))
			.limit(1);

		if (!account) {
			throw new AppError(401, "Invalid credentials!");
		}

		const isCorrectPassword = await bcrypt.compare(
			password,
			account.password,
		);
		if (!isCorrectPassword) {
			throw new AppError(401, "Invalid credentials!");
		}

		if (!account.role) {
			throw new AppError(403, "User has no role assigned");
		}
		await generateJWT(account.id, account.role, res);

		const { password: _pw, ...userData } = account;

		return ok(res, "Login successful!", userData);
	},
);

export const logout: RequestHandler = asyncHandler(
	async (req: Request, res: Response) => {
		res.cookie("jwt", "", { maxAge: 0 });

		return ok(res, "User logged out successfully", {});
	},
);

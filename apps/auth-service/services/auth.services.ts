import type { Signup, Login } from "../src/auth.types";
import { eq, or } from "@stylesync/orm";
import { users, roles } from "@stylesync/storage/db";
import { getDb } from "@stylesync/db";
import { AppError } from "@stylesync/middleware";
import bcrypt from "bcrypt";

type Database = ReturnType<typeof getDb>["db"];

export class AuthService {
	constructor(private readonly db: Database) {}

	async signup(payload: Signup) {
		const { username, password, email, fullname } = payload;

		const [userExists] = await this.db
			.select({
				username: users.username,
				email: users.email,
			})
			.from(users)
			.where(or(eq(users.username, username), eq(users.email, email)))
			.limit(1);

		if (userExists) {
			throw new AppError(409, "Usename or Email already exists");
		}

		const hashedPassword = await this.hashPassword(password);
		const [newUser] = await this.db
			.insert(users)
			.values({
				username,
				email,
				password: hashedPassword,
				fullname,
			})
			.returning({
				id: users.id,
				name: users.fullname,
				email: users.email,
			});

		if (!newUser) {
			throw new AppError(500, "Signup failure: failed to create user ");
		}
		return newUser;
	}

	async login(payload: Login) {
		const { username, password } = payload;

		const [account] = await this.db
			.select({
				id: users.id,
				username: users.username,
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
			throw new AppError(401, "Invalid password!");
		}

		const role = account.role;
		if (!role) {
			throw new AppError(403, "User has no role assigned");
		}

		const {
			password: _pw,
			role: _unusedRole,
			...authenticatedUser
		} = account;

		return { ...authenticatedUser, role };
	}

	private async hashPassword(password: string): Promise<string> {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	}
}

const { db } = getDb();
export const authService = new AuthService(db);

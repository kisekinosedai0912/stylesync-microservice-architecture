import type { Signup, Login } from "../src/auth.types";
import { eq, or } from "@stylesync/db/orm";
import { users, roles } from "@stylesync/db/schema";
import { getDb } from "@stylesync/db";
import { AppError } from "@stylesync/middleware";
import bcrypt from "bcrypt";

type Database = ReturnType<typeof getDb>["db"];

class AuthService {
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
        const [role] = await this.db
            .select({ id: roles.id, role: roles.role })
            .from(roles)
            .where(eq(roles.role, "staff"))
            .limit(1);

        if (!role) {
            throw new AppError(404, "Selected role not found");
        }

        const [newUser] = await this.db
            .insert(users)
            .values({
                username,
                email,
                password: hashedPassword,
                fullname,
                roleId: role.id,
            })
            .returning({
                id: users.id,
                name: users.fullname,
                email: users.email,
            });

        if (!newUser) {
            throw new AppError(500, "Signup failure: failed to create user ");
        }
        return { newUser, userRole: role.role };
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

        const { password: hashedPassword, ...authenticatedUser } = account;
        const isCorrectPassword = await bcrypt.compare(
            password,
            hashedPassword,
        );
        if (!isCorrectPassword) {
            throw new AppError(401, "Invalid password!");
        }

        const role = authenticatedUser.role;
        if (!role) {
            throw new AppError(403, "User has no role assigned");
        }

        return { ...authenticatedUser, role };
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
}

const { db } = getDb();
export const authService = new AuthService(db);

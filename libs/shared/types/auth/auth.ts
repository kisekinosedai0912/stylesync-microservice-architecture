import { z } from "zod";
import { users, roles } from "@stylesync/storage/db";

declare global {
	namespace Express {
		interface Request {
			user?: {
				tbl_users: typeof users.$inferSelect;
				tbl_roles: typeof roles.$inferSelect | null;
			};
		}
	}
}

export type Role = "admin" | "staff";

export const jwtPayloadSchema = z.object({
	userId: z.string(),
	iat: z.number().optional(),
	exp: z.number().optional(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

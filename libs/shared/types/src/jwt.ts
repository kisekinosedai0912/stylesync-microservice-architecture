import { z } from "zod";

export const jwtPayloadSchema = z.object({
	userId: z.string(),
	role: z.enum(["admin", "staff"]),
	iat: z.number().optional(),
	exp: z.number().optional(),
});

export type Role = "admin" | "staff";
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

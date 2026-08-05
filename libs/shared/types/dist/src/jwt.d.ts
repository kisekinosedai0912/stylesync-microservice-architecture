import { z } from "zod";
export declare const jwtPayloadSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        staff: "staff";
    }>;
    iat: z.ZodOptional<z.ZodNumber>;
    exp: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Role = "admin" | "staff";
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
//# sourceMappingURL=jwt.d.ts.map
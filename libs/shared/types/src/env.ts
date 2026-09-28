import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    HOST: z.string(),
    PORT: z.string().default("5000"),
    FRONTEND_URL: z.string().optional(),
    JWT_SECRET: z.string(),
    AUTH_SERVICE_URL: z.string().optional(),
    BOOKING_SERVICE_URL: z.string().optional(),
    INVENTORY_SERVICE_URL: z.string().optional(),
    NOTIFICATION_SERVICE_URL: z.string().optional(),
    SENTRY_DSN: z.string().optional(),
    NODE_ENV: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

import { z } from "zod";

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    HOST: z.string(),
    PORT: z.string().default("5000"),
    FRONTEND_URL: z.string(),
    JWT_SECRET: z.string(),
    AUTH_SERVICE_URL: z.string(),
    BOOKING_SERVICE_URL: z.string(),
    INVENTORY_SERVICE_URL: z.string(),
    NOTIFICATION_SERVICE_URL: z.string(),
    SENTRY_DSN: z.string(),
    NODE_ENV: z.string(),
});

export type Env = z.infer<typeof envSchema>;

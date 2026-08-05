import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    HOST: z.ZodString;
    PORT: z.ZodDefault<z.ZodString>;
    FRONTEND_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    AUTH_SERVICE_URL: z.ZodString;
    BOOKING_SERVICE_URL: z.ZodString;
    INVENTORY_SERVICE_URL: z.ZodString;
    NOTIFICATION_SERVICE_URL: z.ZodString;
    SENTRY_DSN: z.ZodString;
    NODE_ENV: z.ZodString;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
//# sourceMappingURL=env.d.ts.map
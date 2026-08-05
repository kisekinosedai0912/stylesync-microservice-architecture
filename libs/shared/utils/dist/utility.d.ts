import { Role } from "@stylesync/types";
import { Response } from "express";
export declare function getEnv(): {
    DATABASE_URL: string;
    HOST: string;
    PORT: string;
    FRONTEND_URL: string;
    JWT_SECRET: string;
    AUTH_SERVICE_URL: string;
    BOOKING_SERVICE_URL: string;
    INVENTORY_SERVICE_URL: string;
    NOTIFICATION_SERVICE_URL: string;
    SENTRY_DSN: string;
    NODE_ENV: string;
};
export declare function generateJWT(userId: string, role: Role, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=utility.d.ts.map
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
// import { getEnv } from "@stylesync/utils";
import { gatewayGuard } from "@stylesync/middleware";
import { authRateLimiter, globalRateLimiter } from "./rate-limiter";

// const env = getEnv();
const app = express();

const HOST = process.env.HOST ?? "0.0.0.0";
const PORT = Number(process.env.PORT || 4000);
const FRONTEND_URL = process.env.FRONTEND_URL ?? "https://localhost:3000";

// microservices URL
const AUTH_SERVICE_URL =
    process.env.AUTH_SERVICE_URL ?? "http://localhost:5001";
const BOOKING_SERVICE_URL =
    process.env.BOOKING_SERVICE_URL ?? "http://localhost:5002";
const INVENTORY_SERVICE_URL =
    process.env.INVENTORY_SERVICE_URL ?? "http://localhost:5003";
const NOTIFICATION_SERVICE_URL =
    process.env.NOTIFICATION_SERVICE_URL ?? "http://localhost:5004";

const serviceRoutes = [
    {
        publicPrefix: "/api/auth",
        target: AUTH_SERVICE_URL,
        upstreamPrefix: "/auth",
        auth: false,
        rateLimit: authRateLimiter, // auth service's own rate limiter
    },
    {
        publicPrefix: "/api/bookings",
        target: BOOKING_SERVICE_URL,
        upstreamPrefix: "/api",
        auth: true,
    },
    {
        publicPrefix: "/api/inventory",
        target: INVENTORY_SERVICE_URL,
        upstreamPrefix: "/api",
        auth: true,
    },
    {
        publicPrefix: "/api/notification",
        target: NOTIFICATION_SERVICE_URL,
        upstreamPrefix: "/api",
        auth: true,
    },
];

app.disable("x-powered-by");
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    }),
);
// using global rate limiter for all services except auth
app.use(globalRateLimiter);
app.use(cookieParser());
app.use("/api/auth/logout", gatewayGuard);

for (const route of serviceRoutes) {
    const middleware = [
        // using auth service's own rate limiter
        ...(route.rateLimit ? [route.rateLimit] : []),
        ...(route.auth ? [gatewayGuard] : []),
    ];

    app.use(
        route.publicPrefix,
        ...middleware,
        createProxyMiddleware({
            pathRewrite: (path) => `${route.upstreamPrefix}${path}`,
            target: route.target,
            changeOrigin: true,
            xfwd: true,
            on: {
                proxyReq: (proxyReq, req) => {
                    proxyReq.removeHeader("x-user-id");
                    proxyReq.removeHeader("x-user-role");

                    if (req.user) {
                        proxyReq.setHeader("x-user-id", req.user.id);
                        proxyReq.setHeader("x-user-role", req.user.role);
                    }
                },
            },
            timeout: 10_000,
            proxyTimeout: 10_000,
        }),
    );
}

app.listen(PORT, HOST, () => {
    console.log(`API Gateway running at http://${HOST}:${PORT}`);
});

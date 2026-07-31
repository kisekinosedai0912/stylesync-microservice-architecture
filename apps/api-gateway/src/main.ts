import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { getEnv } from "@stylesync/utils";
import { requestGuard } from "@stylesync/middleware";

const env = getEnv();
const app = express();

const HOST = env.HOST ?? "https://localhost:3000";
const PORT = Number(env.PORT || 4000);
const FRONTEND_URL = env.FRONTEND_URL ?? "https://localhost:3000";

// microservices URL
const AUTH_SERVICE_URL = env.AUTH_SERVICE_URL ?? "http://localhost:5001";
const BOOKING_SERVICE_URL = env.BOOKING_SERVICE_URL ?? "http://localhost:5002";
const INVENTORY_SERVICE_URL =
	env.INVENTORY_SERVICE_URL ?? "http://localhost:5003";
const NOTIFICATION_SERVICE_URL =
	env.NOTIFICATION_SERVICE_URL ?? "http://localhost:5004";

const serviceRoutes = [
	{
		publicPrefix: "/api/auth",
		target: AUTH_SERVICE_URL,
		upstreamPrefix: "/api",
		auth: false,
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
app.use(cookieParser());

for (const route of serviceRoutes) {
	const middleware = route.auth ? [requestGuard] : [];

	app.use(
		route.publicPrefix,
		...middleware,
		createProxyMiddleware({
			pathFilter: (pathname) => {
				return (
					pathname === route.publicPrefix ||
					pathname.startsWith(`${route.publicPrefix}/`)
				);
			},
			target: route.target,
			changeOrigin: true,
			xfwd: true,
			timeout: 10_000,
			proxyTimeout: 10_000,
			pathRewrite: {
				[`^${route.publicPrefix}`]: route.upstreamPrefix,
			},
		}),
	);
}

app.listen(PORT, HOST, () => {
	console.log(`API Gateway running at http://${HOST}:${PORT}`);
});

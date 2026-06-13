import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "@stylesync/middleware";
import { getEnv } from "@stylesync/utils";
import authRoutes from "./auth.routes";

const env = getEnv();
const app = express();

const HOST = env.HOST ?? "localhost";
const PORT = Number(env.PORT) || 5000;
const FRONTEND_URL = env.FRONTEND_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: FRONTEND_URL ?? "http://localhost:3000",
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: [
			"Origin",
			"X-Requested-With",
			"Content-Type",
			"Accept",
			"Authorization",
		],
	}),
);

app.use("/api", authRoutes);

app.use(errorHandler);
app.listen(PORT, HOST, async () => {
	console.log(`[ ready ] Server is now running at: http://${HOST}:${PORT}`);
});

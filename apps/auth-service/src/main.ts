import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "@stylesync/middleware";
// import { getEnv } from "@stylesync/utils";
import authRoutes from "./auth.routes";

// const env = getEnv();
const app = express();

const HOST = process.env.HOST ?? "localhost";
const PORT = Number(process.env.PORT || 5001);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRoutes);

app.use(errorHandler);
app.listen(PORT, HOST, async () => {
    console.log(`[ ready ] Server is now running at: http://${HOST}:${PORT}`);
});

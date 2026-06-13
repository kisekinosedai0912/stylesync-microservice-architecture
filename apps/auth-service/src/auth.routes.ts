import { routeGuard } from "@stylesync/middleware";
import express, { Router } from "express";
import { signup, login, logout } from "./auth.controllers";

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", routeGuard, logout);

export default router;

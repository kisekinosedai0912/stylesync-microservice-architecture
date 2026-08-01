import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 15,
	standardHeaders: "draft-8",
	legacyHeaders: false,
});

export const globalRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
});

import { Request, Response, NextFunction, RequestHandler } from "express";

export class AppError extends Error {
	statusCode: number;
	override message: string;

	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
		((this.message = message),
			Error.captureStackTrace(this, this.constructor));
	}
}

export function errorHandler(
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const statusCode = err.statusCode;
	const message = err.message ?? "Internal Server Error";
	console.error(`[ error ] ${message}`);
	return res.status(statusCode).json({
		success: false,
		message,
	});
}

export function asyncHandler(fn: RequestHandler): RequestHandler {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

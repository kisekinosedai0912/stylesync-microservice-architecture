import { Response } from "express";

type ApiResponse<Data> = {
	success: boolean;
	message: string;
	data: Data;
};

function sendResponse<T>(
	res: Response,
	status: number,
	msg: string,
	data: T,
): void {
	const body: ApiResponse<T> = {
		success: status < 400,
		message: msg,
		data,
	};
	res.status(status).json(body);
}

export function ok<ResponseData>(
	res: Response,
	message: string,
	data: ResponseData,
) {
	sendResponse(res, 200, message, data);
}

export function created<ResponseData>(
	res: Response,
	message: string,
	data: ResponseData,
) {
	sendResponse(res, 201, message, data);
}

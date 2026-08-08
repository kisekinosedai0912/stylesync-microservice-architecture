import { Request, Response, NextFunction, RequestHandler } from "express";
export declare class AppError extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
export declare function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
export declare function asyncHandler(fn: RequestHandler): RequestHandler;
//# sourceMappingURL=handlers.d.ts.map
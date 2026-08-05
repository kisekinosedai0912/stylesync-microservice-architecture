import type { LogContext } from "@stylesync/types";
declare class ErrorHandler {
    normalizeError(error: unknown, fallbackMessage: string): Error;
    serializeError(error: unknown): unknown;
    sanitizeContext(context: LogContext): LogContext;
}
export declare const sentryHandler: ErrorHandler;
export {};
//# sourceMappingURL=handler.d.ts.map
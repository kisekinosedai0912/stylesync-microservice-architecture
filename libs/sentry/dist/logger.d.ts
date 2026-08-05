import type { LogContext, ErrorOptions } from "@stylesync/types";
export declare class SentryLogger {
    private readonly scope;
    constructor(scope: string);
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, options?: ErrorOptions): string;
}
export declare function createLogger(scope: string): SentryLogger;
//# sourceMappingURL=logger.d.ts.map
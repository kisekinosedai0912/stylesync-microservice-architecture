import * as Sentry from "@sentry/node";
import type { ErrorOptions, LogContext } from "@stylesync/types";
import { sentryHandler } from "./handler";

export class SentryLogger {
    constructor(private readonly scope: string) {}

    info(message: string, context: LogContext = {}): void {
        const sanitizedContext = sentryHandler.sanitizeContext(context);

        Sentry.addBreadcrumb({
            category: this.scope,
            level: "info",
            message,
            data: sanitizedContext,
        });

        console.info(
            JSON.stringify({
                level: "info",
                scope: this.scope,
                message,
                ...sanitizedContext,
            }),
        );
    }

    warn(message: string, context: LogContext = {}): void {
        const sanitizedContext = sentryHandler.sanitizeContext(context);

        Sentry.addBreadcrumb({
            category: this.scope,
            level: "warning",
            message,
            data: sanitizedContext,
        });

        console.warn(
            JSON.stringify({
                level: "warning",
                scope: this.scope,
                message,
                ...sanitizedContext,
            }),
        );
    }

    error(message: string, options: ErrorOptions = {}): string {
        const { error, context = {}, tags = {} } = options;

        const sanitizedContext = sentryHandler.sanitizeContext(context);

        console.error(
            JSON.stringify({
                level: "error",
                scope: this.scope,
                message,
                error: sentryHandler.serializeError(error),
                ...sanitizedContext,
            }),
        );

        return Sentry.withScope((scope) => {
            scope.setTag("logger.scope", this.scope);
            scope.setTags(tags);
            scope.setContext(this.scope, sanitizedContext);

            if (error !== undefined) {
                scope.setExtra("logMessage", message);

                return Sentry.captureException(
                    sentryHandler.normalizeError(error, message),
                );
            }

            return Sentry.captureMessage(message, "error");
        });
    }
}

export function createLogger(scope: string): SentryLogger {
    return new SentryLogger(scope);
}

import type { LogContext } from "@stylesync/types";

const SENSITIVE_KEYS = new Set([
    "password",
    "token",
    "accessToken",
    "refreshToken",
    "authorization",
    "cookie",
    "secret",
    "apiKey",
]);

class SentryHandler {
    normalizeError(error: unknown, fallbackMessage: string): Error {
        if (error instanceof Error) {
            return error;
        }

        if (typeof error === "string") {
            return new Error(error);
        }

        return new Error(fallbackMessage, {
            cause: error,
        });
    }

    serializeError(error: unknown): unknown {
        if (error instanceof Error) {
            return {
                name: error.name,
                message: error.message,
                stack: error.stack,
                cause: this.sanitizeValue(error.cause),
            };
        }

        return this.sanitizeValue(error);
    }

    sanitizeContext(context: LogContext): LogContext {
        return this.sanitizeValue(context) as LogContext;
    }

    private sanitizeValue(
        value: unknown,
        seen = new WeakSet<object>(),
    ): unknown {
        if (
            value === null ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            return value;
        }

        if (typeof value === "bigint") {
            return value.toString();
        }

        if (typeof value === "undefined") {
            return undefined;
        }

        if (value instanceof Date) {
            return value.toISOString();
        }

        if (value instanceof Error) {
            return {
                name: value.name,
                message: value.message,
                stack: value.stack,
                cause: this.sanitizeValue(value.cause, seen),
            };
        }

        if (typeof value !== "object") {
            return String(value);
        }

        if (seen.has(value)) {
            return "[Circular]";
        }

        seen.add(value);

        if (Array.isArray(value)) {
            return value.map((item) => this.sanitizeValue(item, seen));
        }

        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                SENSITIVE_KEYS.has(key)
                    ? "[REDACTED]"
                    : this.sanitizeValue(nestedValue, seen),
            ]),
        );
    }
}

export const sentryHandler = new SentryHandler();

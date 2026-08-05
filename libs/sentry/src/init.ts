import * as Sentry from "@sentry/node";

export interface SentryInitOptions {
    dsn?: string;
    environment?: string;
    release?: string;
    serviceName: string;
    tracesSampleRate?: number;
}

let initialized = false;

export function sentryInit(options: SentryInitOptions): void {
    if (initialized) {
        return;
    }

    initialized = true;

    if (!options.dsn) {
        console.warn(
            JSON.stringify({
                level: "warning",
                scope: "sentry",
                service: options.serviceName,
                message: "SENTRY_DSN is not configured",
            }),
        );

        return;
    }

    Sentry.init({
        dsn: options.dsn,
        environment: options.environment ?? "development",
        release: options.release,
        serverName: options.serviceName,
        tracesSampleRate: options.tracesSampleRate ?? 0,
        sendDefaultPii: false,
        initialScope: {
            tags: {
                service: options.serviceName,
            },
        },
    });
}

export function isSentryInitialized(): boolean {
    return initialized;
}

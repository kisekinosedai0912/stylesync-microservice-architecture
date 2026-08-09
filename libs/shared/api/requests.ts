import axios, { isAxiosError } from "axios";

type ViteImportMeta = ImportMeta & {
    env?: {
        VITE_API_URL?: string;
    };
};

const apiBaseUrl =
    (import.meta as ViteImportMeta).env?.VITE_API_URL?.replace(/\/$/, "") ||
    "/api";

export const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

function logApiError(error: unknown) {
    if (!isAxiosError(error)) {
        console.error("[api] Non-Axios request error:", error);
        return;
    }

    const { config, response, request, message, code } = error;
    const method = config?.method?.toUpperCase() ?? "REQUEST";
    const url = `${config?.baseURL ?? ""}${config?.url ?? ""}`;

    if (response) {
        console.error(`[api] ${method} ${url} failed`, {
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            headers: response.headers,
        });
        return;
    }

    if (request) {
        console.error(`[api] ${method} ${url} — no response received`, {
            code,
            message,
        });
        return;
    }

    console.error(`[api] ${method} ${url} — request setup failed`, {
        code,
        message,
    });
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        logApiError(error);

        if (
            typeof window !== "undefined" &&
            error.response?.status === 401
        ) {
            // clear auth store and redirect to login
            localStorage.removeItem("auth-storage");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

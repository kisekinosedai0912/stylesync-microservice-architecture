import type { ApiEnvelope, AuthUser, LoginCredentials } from "./auth.types";

const API_BASE_URL: string =
	import.meta.env.VITE_AUTH_API_URL ?? "http://localhost:5001/api";

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

async function request<Data>(path: string, body?: unknown): Promise<Data> {
	let response: Response;
	try {
		response = await fetch(`${API_BASE_URL}${path}`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: body === undefined ? undefined : JSON.stringify(body),
		});
	} catch {
		throw new ApiError(0, "Cannot reach the authentication server.");
	}

	// Guard middleware errors return { message } without the success field,
	// so message is the only reliable error property across responses.
	const payload = (await response.json().catch(() => null)) as Partial<
		ApiEnvelope<Data>
	> | null;

	if (!response.ok) {
		throw new ApiError(
			response.status,
			payload?.message ?? "Something went wrong. Please try again.",
		);
	}

	return payload?.data as Data;
}

export function loginRequest(credentials: LoginCredentials): Promise<AuthUser> {
	return request<AuthUser>("/login", credentials);
}

export function logoutRequest(): Promise<void> {
	return request<void>("/logout");
}

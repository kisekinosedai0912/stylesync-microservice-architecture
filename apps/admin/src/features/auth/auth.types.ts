export type Role = "admin" | "staff";

export type AuthUser = {
	id: string;
	username: string;
	email: string;
	fullname: string;
	role: Role;
};

export type LoginCredentials = {
	username: string;
	password: string;
};

export type ApiEnvelope<Data> = {
	success: boolean;
	message: string;
	data: Data;
};

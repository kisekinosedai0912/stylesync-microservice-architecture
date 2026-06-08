import { envSchema } from "../types/env";

export function getEnv() {
	const envData = envSchema.safeParse(process.env);
	if (!envData.success) {
		throw new Error(
			`Environment variables are invalid: ${envData.error.message}`,
		);
	}
	return envData.data;
}

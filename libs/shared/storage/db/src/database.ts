import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { getEnv } from "@stylesync/utils";
import { Env } from "@stylesync/types";

const dbConnection = (env: Env) => {
	if (!env.DATABASE_URL) {
		throw new Error();
	}

	const pool = new Pool({
		connectionString: env.DATABASE_URL,
		max: 20,
		min: 5,
		idleTimeoutMillis: 30000,
		connectionTimeoutMillis: 20000,
		allowExitOnIdle: false,
	});
	const db = drizzle(pool, { schema });

	pool.on("error", (err: unknown) => {
		console.error("Unexpected error on idle database client", err);
		process.exit(-1);
	});
	return { db, pool };
};

let _db: ReturnType<typeof dbConnection> | undefined;
const env = getEnv();

export const getDb = () => (_db ??= dbConnection(env));

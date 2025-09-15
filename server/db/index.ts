import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./schema/auth-schema";
import * as designSchema from "./schema/design-schema";

export const schema = {
  ...authSchema,
  ...designSchema,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with the pg Pool and the combined schema
export const db = drizzle(pool, { schema });

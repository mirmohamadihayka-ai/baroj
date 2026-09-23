import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { propertySearchReadModel } from "@/infrastructure/database/schema/property-search-read-model";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for PostgreSQL infrastructure.");
}

const pool = new Pool({
  connectionString: databaseUrl,
});

export const database = drizzle({
  client: pool,
  schema: {
    propertySearchReadModel,
  },
});

export { pool as databasePool };

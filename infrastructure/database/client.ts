import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { propertySearchReadModel } from "@/infrastructure/database/schema/property-search-read-model";

let pool: Pool | undefined;
let database:
  | ReturnType<typeof drizzle>
  | undefined;

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required for PostgreSQL infrastructure.");
  }

  return databaseUrl;
}

function getPool(): Pool {
  pool ??= new Pool({
    connectionString: getDatabaseUrl(),
  });

  return pool;
}

export function getDatabase() {
  database ??= drizzle({
    client: getPool(),
    schema: {
      propertySearchReadModel,
    },
  });

  return database;
}

export async function closeDatabasePool(): Promise<void> {
  if (!pool) {
    return;
  }

  await pool.end();
  pool = undefined;
  database = undefined;
}

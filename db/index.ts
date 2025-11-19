import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle/schema';

// Ensure the environment variable for the Drizzle connection string is loaded
if (!process.env.DATABASE_URL) {
  throw new Error('DRIZZLE_DATABASE_URL is not set in .env');
}

const connectionString = process.env.DATABASE_URL!;

// Create the PostgreSQL client
const client = postgres(connectionString, { max: 1,  prepare: false });

// Create the Drizzle ORM instance
export const db = drizzle(client, { schema });


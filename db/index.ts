import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle/schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' })

// Ensure the environment variable for the Drizzle connection string is loaded
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env');
}

const connectionString = process.env.DATABASE_URL!;

// Create the PostgreSQL client
const client = postgres(connectionString, { prepare: false });

// Create the Drizzle ORM instance
export const db = drizzle(client, { schema });


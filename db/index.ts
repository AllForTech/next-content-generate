import { drizzle } from 'drizzle-orm/postgres-js'; // Use 'postgres-js' for Supabase
import postgres from 'postgres';
import * as schema from '../drizzle/schema'; // Import all your schema definitions

const connectionString = process.env.DATABASE_URL!;

// Create the PostgreSQL client
const client = postgres(connectionString);

// Create the Drizzle ORM instance
export const db = drizzle(client, { schema });
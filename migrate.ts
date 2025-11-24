import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  try {
  await migrate(db, { migrationsFolder: 'drizzle/migrations' });
  process.exit(0);
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();

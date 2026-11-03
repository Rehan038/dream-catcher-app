import pg from 'pg';

const { Pool } = pg;

let pool = null;

export function getDatabase() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('Server misconfigured: DATABASE_URL is missing');
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'false'
        ? false
        : { rejectUnauthorized: false }
    });

    pool.on('error', (error) => {
      console.error('Unexpected PostgreSQL pool error:', error);
    });
  }

  return pool;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export default { getDatabase, closeDatabase };

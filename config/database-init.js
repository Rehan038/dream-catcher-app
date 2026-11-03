import { getDatabase } from './database.js';

export async function initDatabase() {
  try {
    const db = getDatabase();
    await db.query(`
      CREATE TABLE IF NOT EXISTS dreams (
        id SERIAL PRIMARY KEY,
        dream_text TEXT NOT NULL,
        interpretation TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

import { pool } from '../config/db.js';

export async function getAllReportes() {
  const result = await pool.query('SELECT * FROM reportes');
  return result.rows;
}

export async function createReporte(data) {
  const { title, status } = data;
  const result = await pool.query(
    'INSERT INTO reportes (title, status) VALUES ($1, $2) RETURNING *',
    [title, status]
  );
  return result.rows[0];
}
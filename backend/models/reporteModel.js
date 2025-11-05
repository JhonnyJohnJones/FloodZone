import { pool } from "../config/db.js";

export const Reportes = {
  async create({ idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude }) {
    const result = await pool.query(
      `INSERT INTO reportes 
       (idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude]
    );
    return result.rows[0];
  },

  async getByUserId(idusuario) {
    const result = await pool.query(
      "SELECT * FROM reportes WHERE idusuario = $1 ORDER BY data DESC, horario DESC",
      [idusuario]
    );
    return result.rows;
  },

  async getByLocation(latitude, longitude, radius = 0.01) {
    // radius = 0.01 ≈ 1 km, ajustável
    const radiusWithMargin = radius + 0.005;
    const result = await pool.query(
      `
      SELECT * FROM reportes
      WHERE data >= NOW() - INTERVAL '2 years'
        AND latitude BETWEEN $1 - $3 AND $1 + $3
        AND longitude BETWEEN $2 - $3 AND $2 + $3
      `,
      [latitude, longitude, radiusWithMargin]
    );
    return result.rows;
  },
};
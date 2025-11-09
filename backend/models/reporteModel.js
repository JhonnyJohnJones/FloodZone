import { pool } from "../configs/db.js";

export const Reportes = {
  async create({ idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude }) {
    const result = await pool.query(
      `INSERT INTO reportes 
       (idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude)
       VALUES ($1,$2,$3,$4,$5,$6,$7,COALESCE($8, CURRENT_DATE), COALESCE($9, NOW()),$10,$11)
       RETURNING *`,
      [idusuario, pais, estado, cidade, bairro, endereco, cep, data, horario, latitude, longitude]
    );
    return result.rows[0];
  },

  async getByLocation(latitude, longitude, radius = 0.01) {
    // radius = 0.01 ≈ 1 km, ajustável
    // console.log(`Latitude Model: ${latitude}`)
    // console.log(`Longitude Model: ${longitude}`)
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius) + 0.005;
    const result = await pool.query(
      `
      SELECT * FROM reportes
      WHERE (data IS NULL OR data >= NOW() - INTERVAL '2 years')
        AND latitude BETWEEN ($1::float8 - $3::float8) AND ($1::float8 + $3::float8)
        AND longitude BETWEEN ($2::float8 - $3::float8) AND ($2::float8 + $3::float8)
      `,
      [lat, lon, rad]
    );
    return result.rows;
  },
};
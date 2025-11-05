import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Função para criar a tabela automaticamente
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      nome VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS reportes (
      idr SERIAL PRIMARY KEY,
      idusuario INT REFERENCES users(id) ON DELETE CASCADE,
      pais VARCHAR(255),
      estado VARCHAR(255),
      cidade VARCHAR(255),
      bairro VARCHAR(255),
      endereco VARCHAR(255),
      cep VARCHAR(20),
      data DATE,
      horario TIMESTAMP,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION
    );
  `);

  console.log("✅ Banco de dados inicializado com sucesso");
}

export { pool, initDB };
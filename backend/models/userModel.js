import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const Users = {
  // Busca todos os usuários
  async getAll() {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return result.rows;
  },

  // Busca usuário por ID
  async getById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  },

  // Cria novo usuário
  async create({ email, senha, nome }) {
    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
      const result = await pool.query(
        "INSERT INTO users (email, senha, nome) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, nome]
      );
      return result.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        throw new Error("Email já está em uso");
      }
      throw err;
    }
  },

  // Busca usuário por email (usado para login)
  async getByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  },

  // Verifica se a senha está correta (login)
  async verifyPassword(user, senha) {
    return bcrypt.compare(senha, user.senha);
  },
};

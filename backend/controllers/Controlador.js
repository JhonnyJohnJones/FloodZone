import { Users } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY;

export const UserController = {
  // 🔹 Lista todos os usuários
  async getAll(req, res) {
    try {
      const users = await Users.getAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  },

  // 🔹 Busca usuário por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await Users.getById(id);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },

  // 🔹 Cria um novo usuário (com senha criptografada)
  async create(req, res) {
    try {
      const { email, senha, nome } = req.body;

      if (!email || !senha)
        return res.status(400).json({ error: "Email e senha são obrigatórios" });

      // Verifica se o email já existe
      const existing = await Users.getByEmail(email);
      if (existing) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Cria usuário
      const newUser = await Users.create({ email, senha: hashedPassword, nome });
      res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  },

  // 🔹 Login com geração de token JWT
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha)
        return res.status(400).json({ error: "Email e senha são obrigatórios" });

      const user = await Users.getByEmail(email);
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const validPassword = await bcrypt.compare(senha, user.senha);
      if (!validPassword)
        return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.json({ message: "Login bem-sucedido", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao realizar login" });
    }
  },
};

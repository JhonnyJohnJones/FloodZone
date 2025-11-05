import { Users } from "../models/userModel.js";
import { Reportes } from "../models/reporteModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY;

export const UserController = {

  // Busca usuário por ID
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

  // Cria um novo usuário (com senha criptografada)
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

  // Login com geração de token JWT
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




export const ReporteController = {
  async create(req, res) {
    try {
      const {
        idusuario,
        pais,
        estado,
        cidade,
        bairro,
        endereco,
        cep,
        data,
        horario,
        latitude,
        longitude,
      } = req.body;

      if (!idusuario || !latitude || !longitude)
        return res.status(400).json({ error: "idusuario, latitude e longitude são obrigatórios" });

      const newReport = await Reportes.create({
        idusuario,
        pais,
        estado,
        cidade,
        bairro,
        endereco,
        cep,
        data,
        horario,
        latitude,
        longitude,
      });

      res.status(201).json(newReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar reporte" });
    }
  },

  async getByUserId(req, res) {
    try {
      const { idusuario } = req.params;
      const reportes = await Reportes.getByUserId(idusuario);
      res.json(reportes);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar reportes do usuário" });
    }
  },

  async getByLocation(req, res) {
    try {
      const { latitude, longitude } = req.query;
      if (!latitude || !longitude)
        return res.status(400).json({ error: "latitude e longitude são obrigatórios" });

      const radius = parseFloat(req.query.radius) || 0.01;
      const reportes = await Reportes.getByLocation(parseFloat(latitude), parseFloat(longitude), radius);
      res.json(reportes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar reportes por localização" });
    }
  },
};

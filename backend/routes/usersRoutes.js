import express from "express";
import { Controlador } from "../controllers/Controlador.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registrar novo usuário
router.post("/register", Controlador.Users.create);

// Login
router.post("/login", Controlador.Users.login);

// Buscar usuário por ID (autenticado)
router.get("/:id", authMiddleware, Controlador.Users.getById);

export default router;
import express from "express";
import { ReporteController } from "../controllers/reporteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar novo reporte (autenticado)
router.post("/", authMiddleware, ReporteController.create);

// Buscar todos os reportes de um usuário
router.get("/usuario/:idusuario", authMiddleware, ReporteController.getByUserId);

// Buscar todos os reportes próximos de uma latitude/longitude
router.get("/localizacao", ReporteController.getByLocation);

export default router;
import express from "express";
import { Controlador } from "../controllers/Controlador.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar novo reporte (autenticado)
router.post("/", authMiddleware, Controlador.Reportes.create);

// Buscar todos os reportes do usuário logado
router.get("/usuario", authMiddleware, Controlador.Reportes.getByUserId);

// Gerar heatmap de enchentes a partir de latitude/longitude
router.get("/heatmap", Controlador.Heatmap.getHeatmap);

export default router;

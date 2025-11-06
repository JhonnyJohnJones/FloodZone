import express from "express";
import { Controlador } from "../controllers/Controlador.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar novo reporte (autenticado)
router.post("/reportar", authMiddleware, Controlador.Reportes.create);

// Gerar heatmap de enchentes a partir de latitude/longitude
router.get("/heatmap", authMiddleware, Controlador.Heatmap.getHeatmap);

export default router;

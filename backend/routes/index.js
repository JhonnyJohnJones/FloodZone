import { Router } from "express";
import userRoutes from "./userRoutes.js";
import reportesRoutes from "./reportesRoutes.js";

const router = Router();

// Rota raiz apenas para teste
router.get("/", (req, res) => {
  res.send("Servidor Express funcionando ✅");
});

// Rotas de usuário
router.use("/users", userRoutes);

// Rotas de reportes (incluindo heatmap)
router.use("/reportes", reportesRoutes);

export default router;
import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { initDB } from "./configs/db.js";

// Carrega variáveis de ambiente do .env
dotenv.config();

try{
  await initDB()
} catch (err) {
  console.log(`Erro ao iniciar DB: ${err}`)
}

const app = express();

// Middleware para receber JSON
app.use(express.json());

// Middleware para logs simples 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rotas
app.use("/api", routes);

// Rota 404 para endpoints não encontrados
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ✅`);
});

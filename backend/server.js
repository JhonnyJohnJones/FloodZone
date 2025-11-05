import app from './app.js';
import { initDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

initDB().catch((err) => console.error("Erro ao inicializar DB:", err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
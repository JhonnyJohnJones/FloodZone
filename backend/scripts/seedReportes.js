import { Reportes } from "../models/reporteModel.js";

async function popularReportesAutomaticamente(baseLat, baseLon, quantidade = 100, raioMaxKm = 5) {
  try {
    const grauPorKm = 1 / 111; // 1 grau ≈ 111 km
    const promises = [];

    for (let i = 0; i < quantidade; i++) {
      // Raio aleatório entre 0 e raioMaxKm
      const raioKm = Math.random() * raioMaxKm;

      // Direção aleatória (ângulo entre 0° e 360°)
      const angulo = Math.random() * 2 * Math.PI;

      // Conversão de km para graus
      const deltaLat = raioKm * Math.cos(angulo) * grauPorKm;
      const deltaLon = raioKm * Math.sin(angulo) * grauPorKm / Math.cos(baseLat * (Math.PI / 180));

      const latitude = baseLat + deltaLat;
      const longitude = baseLon + deltaLon;

      // Cria apenas com idusuario, latitude e longitude
      const novoReporte = {
        idusuario: 2,
        latitude,
        longitude,
      };

      promises.push(Reportes.create(novoReporte));
    }

    const results = await Promise.all(promises);
    console.log(`✅ ${results.length} reportes inseridos com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao popular reportes:", error);
  }
}

await popularReportesAutomaticamente(-23.55052, -46.633308, 100, 10);

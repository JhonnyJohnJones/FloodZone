export const Maps = {
  // Busca os reportes relevantes com base em latitude, longitude e raio
  async reportes(latitude, longitude, radius = 0.001) {
    // Aqui usamos a função já existente do modelo
    const result = await Reportes.getByLocation(latitude, longitude, radius);
    return result;
  },

  // Cria o heatmap a partir dos reportes encontrados
  async criarHeatmap(latitude, longitude) {
    const reportes = await this.reportes(latitude, longitude, 0.001);

    const clusters = [];
    const clusterRadius = 0.001; // ~100m
    const maxCredibilidade = 5;

    for (const r of reportes) {
      const existingCluster = clusters.find(
        (c) =>
          Math.abs(c.latitude - r.latitude) < clusterRadius &&
          Math.abs(c.longitude - r.longitude) < clusterRadius
      );

      if (existingCluster) {
        existingCluster.count++;
      } else {
        clusters.push({
          latitude: r.latitude,
          longitude: r.longitude,
          count: 1,
        });
      }
    }

    const points = clusters.map((c) => ({
      latitude: c.latitude,
      longitude: c.longitude,
      credibilidade: Math.min(c.count, maxCredibilidade),
    }));

    return { points };
  },
};
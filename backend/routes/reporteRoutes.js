import { getAllReportes, createReporte } from '../models/reporteModel.js';

export const getReportes = async (req, res) => {
  try {
    const reportes = await getAllReportes();
    res.json(reportes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar reportes' });
  }
};

export const createReporte = async (req, res) => {
  try {
    const newReporte = await createReporte(req.body);
    res.status(201).json(newReporte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar reporte' });
  }
};
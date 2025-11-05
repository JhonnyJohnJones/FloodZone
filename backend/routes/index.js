import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Servidor Express funcionando ✅');
});

export default router;
import { Router } from 'express';
import { ConfirmadosController } from '../controllers/confirmados.controller';
import { requireLogin, requireRole } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireLogin);
router.get('/', ConfirmadosController.getConfirmados);
router.post('/sync', requireRole(['admin']), ConfirmadosController.synConfirmados);

export default router;
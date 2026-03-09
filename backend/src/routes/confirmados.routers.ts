import { Router } from 'express';
import { ConfirmadosController } from '../controllers/confirmados.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireLogin);
router.get('/', ConfirmadosController.getConfirmados);
export default router;
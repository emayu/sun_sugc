import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { requireLogin } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireLogin);
router.patch('/:id/password', UsuarioController.updatePassword);
router.post('/', UsuarioController.create);

export default router;
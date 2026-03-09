import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { requireLogin, requireRole } from '../middlewares/auth.middleware';
import { RegistroAsistenciaController } from '../controllers/registroAsistencia.controller';

const router = Router();

router.use(requireLogin, requireRole(['admin','recepcion']));
router.get('/', RegistroAsistenciaController.getRegistros);
router.post('/', RegistroAsistenciaController.createRegistro);
router.put('/:id', RegistroAsistenciaController.updateRegistro)

export default router;
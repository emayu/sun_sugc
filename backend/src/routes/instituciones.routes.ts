import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { requireLogin, requireRole } from '../middlewares/auth.middleware';
import { GestionController } from '../controllers/gestion.controller';


const router = Router();
router.use(requireLogin);
router.get('/', InstitucionController.getInstitucionesByResponsable);
router.get('/all', requireRole(['admin']), InstitucionController.getAllInstituciones);
router.get('/:id', InstitucionController.getInstitucionById)
router.get('/:id/gestiones', GestionController.getHistorialPorInstitucion);
router.post('/:id_institucion/gestiones', GestionController.createGestion);
router.post('/:id/send/invitacion', GestionController.sendInvitacion);

export default router;
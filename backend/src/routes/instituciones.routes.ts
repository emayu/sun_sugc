import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';
import { requireLogin } from '../middlewares/auth.middleware';
import { GestionController } from '../controllers/gestion.controller';


const router = Router();
router.use(requireLogin)
router.get('/', InstitucionController.getInsitucionesByResponsable);
router.get('/:id/gestiones', GestionController.getHistorialPorInstitucion)

export default router;
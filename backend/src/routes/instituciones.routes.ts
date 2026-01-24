import { Router } from 'express';
import { InstitucionController } from '../controllers/institucion.controller';


const router = Router();

router.get('/instituciones', InstitucionController.getInsitucionesByResponsable)


export default router;
import { Router } from 'express';
import { ResultadosGestionController } from '../controllers/resultadosGestion.controller';

const router = Router();


router.get('/', ResultadosGestionController.getAllEstados);
export default router;
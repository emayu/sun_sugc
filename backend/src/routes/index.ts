import { Router } from "express";
import institucionRoutes from "./instituciones.routes";
import resultadosGestion from "./resultadosGestion.routers";
import authRoutes from "./auth.routes";
import usuarioRoutes from './usuarios.routes';

const router = Router();


router.use('/',  authRoutes);
router.use('/instituciones', institucionRoutes);
router.use('/resultados_gestion', resultadosGestion );
router.use('/usuarios', usuarioRoutes);

export default router;
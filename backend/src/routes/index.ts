import { Router } from "express";
import institucionRoutes from "./instituciones.routes";
import resultadosGestion from "./resultadosGestion.routers";
import authRoutes from "./auth.routes";
import usuarioRoutes from './usuarios.routes';
import confirmadosRoutes from './confirmados.routers';
import registroAsistencia from './registroAsistencia.routes';

const router = Router();


router.use('/',  authRoutes);
router.use('/instituciones', institucionRoutes);
router.use('/resultados_gestion', resultadosGestion );
router.use('/usuarios', usuarioRoutes);
router.use('/confirmados', confirmadosRoutes);
router.use('/registro_asistencia', registroAsistencia);

export default router;
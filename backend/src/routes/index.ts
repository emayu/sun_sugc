import { Router } from "express";
import institucionRoutes from "./instituciones.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use('/', institucionRoutes);
router.use('/',  authRoutes);

export default router;
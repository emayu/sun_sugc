import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
// router.get('/session', getSession );
// router.post('/logout', logout);


export default router;
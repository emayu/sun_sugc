import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { verifyToken } from '../security/security';

export function requireLogin(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) {
      return sendResponse(res, 401, {
                status: 'fail',
                message: 'No autorizado. Inicia sesión primero.',
            });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;

        // 4. Continuar al siguiente paso (Controlador)
        next();
    } catch (error) {
        return sendResponse(res, 403, {
            status: 'fail',
            message: 'Token inválido o ha expirado'
        });
    }
}


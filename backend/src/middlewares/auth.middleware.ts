import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { verifyToken } from '../security/security';
import { UserSession } from '../types/express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

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
        req.user = decoded as UserSession;

        // 4. Continuar al siguiente paso (Controlador)
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return sendResponse(res, 401, {
                status: 'fail',
                message: 'Token expirado'
            });
        } else if (error instanceof JsonWebTokenError) {
            return sendResponse(res, 401, {
                status: 'fail',
                message: 'Token inválido'
            });
        } else {
            return sendResponse(res, 401, {
                status: 'fail',
                message: 'Ocurrió un error al validar Token'
            });
        }
    }
}

export function requireRole(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { roles } = req.user;
        const hasPermission = roles.some(role => allowedRoles.includes(role));
        if (hasPermission) {
            return next();
        }
        return sendResponse(res, 403, {
            status: 'fail',
            message: 'No autorizado. No tienes los permisos suficientes.',
        });
    }
}


import { NextFunction, Request, Response } from 'express';

import { sendResponse } from '../utils/sendResponse';
import { AuthService } from '../services/auth.service';


export async function login(req: Request, res: Response, next:NextFunction) {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
        return sendResponse(res, 400, {  status: 'fail', message: 'Correo y contraseña requeridos' });
    }

    try {
        const result = await AuthService.login(correo, contrasena);
        return sendResponse(res, 200, {
            status: 'success',
            message: 'Login exitoso',
            data: result
        });
    } catch (error) {
        next(error);
    }

}


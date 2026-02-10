import {Request, Response} from "express";
import { sendResponse } from "../utils/sendResponse";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController {
    static async updatePassword(req:Request, res:Response){
        try{
            const { id } = req.params;
            const { contrasena } = req.body;

            const user = req.user;
            if (!user.roles.includes('admin')) {
                return sendResponse(res, 401, {
                    status: 'fail',
                    message: 'Operación no autorizada, no se cuenta con los permisos necesarios.',
                });
            }

            if(!contrasena){
                return sendResponse(res, 400, {status:"fail", message: 'Contraseña requerida'});
            }

            await UsuarioService.actualizarPassword(Number(id), contrasena);

            return sendResponse(res, 200, { status: "success", message: 'Contraseña actualizada'});
        }catch( error:any){
            console.log(error);
            return sendResponse(res, 500, { status: 'error', message: error.message || 'Ocurrió un error'})
        }
    }

    static async create(req:Request, res:Response){
        const user = req.user;
            if (!user.roles.includes('admin')) {
                return sendResponse(res, 401, {
                    status: 'fail',
                    message: 'Operación no autorizada, no se cuenta con los permisos necesarios.',
                });
            }
        const nuevoUsuario = await UsuarioService.createUser(req.body);
        return sendResponse(res, 200, {
            status: "success",
            message: "Usuario creado",
            data: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email:nuevoUsuario.email, roles: nuevoUsuario.roles }
        });
    }
}
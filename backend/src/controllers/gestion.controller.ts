import {Request, Response} from "express";
import { sendResponse } from "../utils/sendResponse";
import { GestionService } from "../services/gestion.service";
import { TypedRequestBody } from "../types/express";
import { BitacoraCreationModel } from "../models/bitacora.model";
import { MailerService } from "../services/mail/mailer.service";

export class GestionController {
    static async getHistorialPorInstitucion(req:Request, res:Response){
        try{
            const { id:idInstitucion} = req.params;

            const historial = await GestionService.getHistorial(Number(idInstitucion));
            return sendResponse(res, 200, {
                status: "success",
                message: "Historial obtenido",
                data: historial
            })
        }catch(error:any){
            return sendResponse(res, 500, { status: "error", message: error.message})
        }
    }

    static async createGestion(req:TypedRequestBody<BitacoraCreationModel>, res:Response){
        try{
            const data = req.body;
            //Asegurar datos de creación
            const idUsuario = req.user!.subId;
            data.id_usuario =  idUsuario!;
            data.id_institucion = Number(req.params.id_institucion);
            const result = await GestionService.createGestion(data);
            return sendResponse(res, 200, {status: "success", message:"Gestión agregada", data: result});
        }catch(error:any){
            console.error('error al crear registro', error);
            return sendResponse(res, 500, { status: "error", message: error.message})
        }
        // sendResponse(res, 200, { status:"success", message:"foo", data: new Date() })?
    }

    static async sendInvitacion(req:Request, res:Response){
        try{
            const { id:idInstitucion } = req.params;
            const { destinatarios } = req.body;
            // console.log('destinatarios recibidos', destinatarios);
            if(!Array.isArray(destinatarios) || destinatarios.length === 0){
                return sendResponse(res, 400, {status: "fail", message: "Debe especificar destinatarios"})
            }
            const userId = req.user.subId;
            const mailService = new MailerService();
            const result = await mailService.enviarInvitacion(Number(idInstitucion), userId, destinatarios);
            return sendResponse(res, 200, {status: "success", message:"Invitación enviada", data: result});
        }catch(error:any){
            console.error('Error al enviar invitación', error);
            return sendResponse(res, 500, { status: 'error', message: error.message});
        }
    }
} 

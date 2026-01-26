import {Request, Response} from "express";
import { sendResponse } from "../utils/sendResponse";
import { GestionService } from "../services/gestion.service";
import { TypedRequestBody } from "../types/express";
import { BitacoraCreationModel } from "../models/bitacora.model";

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
} 
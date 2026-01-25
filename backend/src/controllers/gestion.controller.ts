import {Request, Response} from "express";
import { sendResponse } from "../utils/sendResponse";
import { GestionService } from "../services/gestion.service";

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
} 
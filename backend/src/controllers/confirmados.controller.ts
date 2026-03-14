import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ConfirmacionService } from "../services/confirmacion.service";
import { GSheeSyncService } from "../services/gsheet-sync"

export class ConfirmadosController{
    static async getConfirmados(req:Request, res:Response){
        const confirmados = await ConfirmacionService.getAllInstituciones();
        sendResponse(res, 200, {status:"success", message:"Lista de instituciones confirmadas", data: confirmados});
    }


    static async synConfirmados(req:Request, res:Response){
        try{
            const result = await GSheeSyncService.sync();
            sendResponse(res, 200, {status:"success", message:"Lista de instituciones confirmadas sincronizada", data: result});
        }catch(error:any){
            console.error(error);
            sendResponse(res, 500, {status:"error", message:error.message});
        }
    }
}
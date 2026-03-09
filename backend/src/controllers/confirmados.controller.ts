import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ConfirmacionService } from "../services/confirmacion.service";

export class ConfirmadosController{
    static async getConfirmados(req:Request, res:Response){
        const confirmados = await ConfirmacionService.getAllInstituciones();
        sendResponse(res, 200, {status:"success", message:"Lista de instituciones confirmadas", data: confirmados});
    }
}
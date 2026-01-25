import { Request, Response } from "express";
import { GestionService } from "../services/gestion.service";
import { sendResponse } from "../utils/sendResponse";

export class ResultadosGestionController{
    static async getAllEstados(req:Request, res:Response){
        const resultadosGestion = await GestionService.getAllResultadosGestion();
        sendResponse(res, 200, {status:"success", message:"Lista de resultados gestion", data: resultadosGestion});
    }
}
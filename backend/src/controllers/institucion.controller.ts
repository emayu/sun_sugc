import { Request, Response } from "express";
import { InsitucionService } from "../services/institucion.service";
import { sendResponse } from "../utils/sendResponse";

export class InstitucionController {
    static async getInsitucionesByResponsable(req: Request, response: Response) {
        try{
        //TODO: extraer id de la sesion

        const instituciones = await InsitucionService.getInsitucionesByResponsable(1);
        return sendResponse(response, 200, {
            status: "success",
            message: "List exitoso",
            data: instituciones
        })
        }catch(error){
            console.error("error", error);
            return sendResponse(response, 500, {
                status: "error",
                message: "Ocurrio un error"
            });
            
        }

    }
}

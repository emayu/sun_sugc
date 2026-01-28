import { Request, Response } from "express";
import { InstitucionService } from "../services/institucion.service";
import { sendResponse } from "../utils/sendResponse";

export class InstitucionController {
    static async getInsitucionesByResponsable(req: Request, response: Response) {
        try {
            // console.log(req.user);
            const idUsuario = req.user.subId;

            const instituciones = await InstitucionService.getInsitucionesByResponsable(idUsuario);
            return sendResponse(response, 200, {
                status: "success",
                message: "List exitoso",
                data: instituciones
            })
        } catch (error) {
            console.error("error", error);
            return sendResponse(response, 500, {
                status: "error",
                message: "Ocurrio un error"
            });
            
        }

    }
}

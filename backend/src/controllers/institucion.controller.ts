import { Request, Response } from "express";
import { InstitucionService } from "../services/institucion.service";
import { sendResponse } from "../utils/sendResponse";

export class InstitucionController {
    static async getInsitucionesByResponsable(req: Request, response: Response) {
        try {
            // console.log(req.user);
            const idUsuario = req.user?.subId!;

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
                message: "Ocurrió un error"
            });
            
        }

    }

    static async getInstitucionById(req: Request, res: Response) {
        try {
            const { id: idInstitucion } = req.params;
            const historial = await InstitucionService.getInstitucionById(Number(idInstitucion));
            return sendResponse(res, 200, {
                status: "success",
                message: "Historial obtenido",
                data: historial
            })
        } catch (error: any) {
            console.error("error", error);
            return sendResponse(res, 500, {
                status: "error",
                message: "Ocurrió un error"
            });
        }

    }
}

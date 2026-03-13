import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ConfirmacionService } from "../services/confirmacion.service";
import { RegistroAsistenciaService } from "../services/registroAsistencia.service";
import { TypedRequestBody } from "../types/express";
import { RegistroAsistenciaCreationModel, RegistroAsistenciaModel } from "../models/registroAsistencia.model";

export class RegistroAsistenciaController{
    static async getRegistros(req:Request, res:Response){
        const fecha_registro = req.query.fecha_registro?.toString() || "hoy";
        const registrados = await RegistroAsistenciaService.getByFecha(fecha_registro);
        sendResponse(res, 200, {status:"success", message:"Lista de instituciones registradas", data: registrados});
    }

    static async createRegistro(req:TypedRequestBody<RegistroAsistenciaCreationModel>, res:Response){
        try{
            const data = req.body;
            if(!data){
                return sendResponse(res, 400, {  status: 'fail', message: 'body requerido, debe enviar un objetivo válido' });
            }

            //Asegurar datos de creación
            const idUsuario = req.user!.subId;
            data.id_usuario_registro =  idUsuario!;
            const result = await RegistroAsistenciaService.createRegistroAsistencia(data);
            return sendResponse(res, 200, {status: "success", message:"Registro creado", data: result});
        }catch(error:any){
            console.error('error al crear registro', error);
            return sendResponse(res, 500, { status: "error", message: error.message})
        }
    } 

    static async updateRegistro(req:TypedRequestBody<RegistroAsistenciaCreationModel>, res:Response){
        try{
            const registroId = Number(req.params.id);
            const data = req.body;
            if(!data){
                return sendResponse(res, 400, {  status: 'fail', message: 'body requerido, debe enviar un objetivo válido' });
            }

            //Asegurar datos 
            const updateData : Partial<RegistroAsistenciaModel> = {
                tipo_registro : data.tipo_registro,
                nombre_establecimiento : data.nombre_establecimiento,
                cantidad_estudiantes: data.cantidad_estudiantes,
                nombre_encargado: data.nombre_encargado,
                salon_asignado: data.salon_asignado,
                tel_encargado: data.tel_encargado,
                observaciones: data.observaciones

            }
            const result = await RegistroAsistenciaService.updateRegistroAsistencia(registroId, updateData);
            return sendResponse(res, 200, {status: "success", message:"Registro actualizado", data: result});
        }catch(error:any){
            console.error('error al crear registro', error);
            return sendResponse(res, 500, { status: "error", message: error.message})
        }
    } 
}
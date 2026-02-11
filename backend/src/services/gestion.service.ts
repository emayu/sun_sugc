import { sequelize } from "../config/database";
import { ResultadoGestion } from "../models";
import { BitacoraCreationModel } from "../models/bitacora.model";
import { ESTADO_INSTITUCION } from "../models/estadoInstitucion.model";
import { InstitucionModel } from "../models/institucion.model";
import { RESULTADO_GESTION } from "../models/resultadoGestion.model";
import { BitacoraRepository } from "../repositories/bitacora.repository";
import { InstitucionRepository } from "../repositories/institucion.repository";
import { RestultadoGestionRepository } from "../repositories/resultadoGestion.respository";


export class GestionService{
    static getHistorial(id_institucion: number){
        return BitacoraRepository.findByInstitucion(id_institucion);
    }

    static getAllResultadosGestion(){
        return RestultadoGestionRepository.getAll();
    }

    static async createGestion(data:BitacoraCreationModel){

        const institucion = await InstitucionRepository.findById(data.id_institucion);

        if(institucion?.id_responsable !== data.id_usuario){
            throw Error("FORBIDDEN");
        }
        
        const institucionUpdate:Partial<InstitucionModel> = { };
        let nextStep = "none";

        if(data.id_resultado === RESULTADO_GESTION.CONTACTO_EXITOSO){
            nextStep = "Enviar invitación";
            institucionUpdate.id_estado_institucion = ESTADO_INSTITUCION.CONTACTADO; //Pendiente envío correo
            this.checkNumberOnSuccessContact(institucionUpdate, institucion, data);
        }

        this.checkAddNewNumber(institucionUpdate, institucion, data);
        
        
        if(!institucionUpdate.id_estado_institucion && institucion.id_estado_institucion === ESTADO_INSTITUCION.PENDIENTE ){  //PENDIENTE
            institucionUpdate.id_estado_institucion = ESTADO_INSTITUCION.EN_PROCESO; // EN PROCESO
        }

        
        const now = new Date();
        data.fecha_gestion_final = now;
        institucionUpdate.ultima_gestion_at = now;
        const transaction = await sequelize.transaction();
        try{
            const newRegistro = await BitacoraRepository.create(data, transaction);
            await InstitucionRepository.update(institucion.id, institucionUpdate, transaction);
            await transaction.commit();
            const updatedInstitucion = await InstitucionRepository.findById(institucion.id);

            return {
                nextStep,
                gestion: newRegistro,
                institucion: updatedInstitucion,
            }
        }catch(error){
            await transaction.rollback();
            throw error;
        }        
    }

    static checkAddNewNumber(institucionUpdate:Partial<InstitucionModel>, insitucionDbData:InstitucionModel, newRegister:any){
        //chequea que se envie los datos correcto
        if(newRegister.id_resultado !== RESULTADO_GESTION.DATO_ENCONTRADO || !newRegister.nuevo_telefono){
            return;
        }
        //colocar en el primero libre
        if(!insitucionDbData.tel_nuevo_1){
            institucionUpdate.tel_nuevo_1 = newRegister.nuevo_telefono;
            institucionUpdate.estado_tel_nuevo_1 = "Pendiente validar";
            return;
        }
        if(!insitucionDbData.tel_nuevo_2){
            institucionUpdate.tel_nuevo_2 = newRegister.nuevo_telefono;
            institucionUpdate.estado_tel_nuevo_2 = "Pendiente validar";
            return;
        }
        if(!insitucionDbData.tel_nuevo_3){
            institucionUpdate.tel_nuevo_3 = newRegister.nuevo_telefono;
            institucionUpdate.estado_tel_nuevo_3 = "Pendiente validar";
            return;
        }
    }


    static checkNumberOnSuccessContact(institucionUpdate:Partial<InstitucionModel>, insitucionDbData:InstitucionModel, newRegister:BitacoraCreationModel){
        if(newRegister.medio_contacto === "tel_nuevo_1"){
            institucionUpdate.estado_tel_nuevo_1 = "Activo";
        }
        if(newRegister.medio_contacto === "tel_nuevo_2"){
            institucionUpdate.estado_tel_nuevo_2 = "Activo";
        }
        if(newRegister.medio_contacto === "tel_nuevo_3"){
            institucionUpdate.estado_tel_nuevo_3 = "Activo";
        }
    }


}
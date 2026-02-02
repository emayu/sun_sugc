import { sequelize } from "../config/database";
import { ResultadoGestion } from "../models";
import { BitacoraCreationModel } from "../models/bitacora.model";
import { InstitucionModel } from "../models/institucion.model";
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
        const newResultado = await RestultadoGestionRepository.findById(data.id_resultado);


        if(institucion?.id_responsable !== data.id_usuario){
            throw Error("FORBIDDEN");
        }

        let nextStep = "none"
        if(newResultado?.nombre === "Contacto exitoso"){
            nextStep = "Enviar invitación";
        }

        const institucionUpdate:Partial<InstitucionModel> = { };
        if(institucion.id_estado_institucion === 1 ){  //PENDIENTE
            institucionUpdate.id_estado_institucion = 2; // EN PROCESO
        }

        
        const now = new Date();
        data.fecha_gestion_final = now;
        institucionUpdate.ultima_gestion_at = now;
        const transaction = await sequelize.transaction();
        try{
            const newRegistro = await BitacoraRepository.create(data, transaction);
            await InstitucionRepository.update(institucion.id, institucionUpdate, transaction);
            const updatedInstitucion = await InstitucionRepository.findById(institucion.id);
            await transaction.commit();

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
}
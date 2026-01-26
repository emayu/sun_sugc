import { sequelize } from "../config/database";
import { ResultadoGestion } from "../models";
import { BitacoraCreationModel } from "../models/bitacora.model";
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

        if(institucion.id_estado_institucion === 1 ){  //PENDIENTE
            institucion.id_estado_institucion = 2; // EN PROCESO
        }

        
        const now = new Date();
        data.fecha_gestion_final = now;
        institucion.ultima_gestion_at = now;
        const transaction = await sequelize.transaction();
        try{
            const newRegistro = await BitacoraRepository.create(data, transaction);
            await InstitucionRepository.update(institucion, transaction);
            await transaction.commit();

            return {
                nextStep,
                gestion: newRegistro
            }
        }catch(error){
            await transaction.rollback();
            throw error;
        }        
    }
}
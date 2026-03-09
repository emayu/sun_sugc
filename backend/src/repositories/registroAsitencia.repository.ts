import { Transaction, where } from "sequelize";
import { sequelize } from "../config/database";
import { RegistroAsistencia } from "../models";
import { RegistroAsistenciaCreationModel, RegistroAsistenciaModel } from "../models/registroAsistencia.model";



export class RegistroAsistenciasRepository{
    static findAll(){
        return RegistroAsistencia.findAll();
    }

    static create( data:RegistroAsistenciaCreationModel, transaction?:Transaction){
        return RegistroAsistencia.create(data, { transaction });
    }

    static update(id:number, dataToUpdate:Partial<RegistroAsistenciaModel>, transaction?:Transaction){
        return RegistroAsistencia.update(dataToUpdate, {
            where: { id },
            transaction
        });
    }
}
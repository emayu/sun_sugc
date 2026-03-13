import { Sequelize, Transaction, where } from "sequelize";
import { sequelize } from "../config/database";
import { RegistroAsistencia, Usuario } from "../models";
import { RegistroAsistenciaCreationModel, RegistroAsistenciaModel } from "../models/registroAsistencia.model";



export class RegistroAsistenciasRepository{
    static findAll(){
        return RegistroAsistencia.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre']
                }
            ],
            order: [['fecha_registro', 'desc']]
        });
    }

    static findByFechaRegistro(date:Date){
        return RegistroAsistencia.findAll({
            where: Sequelize.where(
                Sequelize.fn('DATE', sequelize.col('fecha_registro')),
                Sequelize.fn('DATE', date)
            ),
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre']
                }
            ],
            order: [['fecha_registro', 'desc']]
        });
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
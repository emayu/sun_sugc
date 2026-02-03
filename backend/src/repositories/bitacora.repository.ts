import { Transaction } from "sequelize";
import { BitacoraCreationModel } from "../models/bitacora.model";
import { Bitacora, ResultadoGestion, Usuario } from "../models";


export class BitacoraRepository {

    static async create( data:BitacoraCreationModel, transaction?:Transaction){
        return await Bitacora.create(data, { transaction });
    }


    static async findByInstitucion(idInstitucion:number){
        return await Bitacora.findAll({
            where: { id_institucion: idInstitucion},
            include: [
                {
                    model: ResultadoGestion,
                    as: 'resultado',
                    attributes: ['id', 'nombre', 'descripcion']
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['nombre']
                }
            ],
            order: [ ["fecha_gestion_final", "desc"]]
        });
    }
}
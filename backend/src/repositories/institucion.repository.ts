import { Transaction, where } from "sequelize";
import { sequelize } from "../config/database";
import { Institucion, InstitucionModel } from "../models/institucion.model";

export class InstitucionRepository{
    static async findByResponsable(idResponsable:number):Promise<InstitucionModel[]> {
        return Institucion.findAll({ 
            where: { id_responsable: idResponsable},
            include: ['estado'],
            order: ['id']
        });
    }

    static async findById(id:number):Promise<InstitucionModel | null>{
        return await Institucion.findOne({ where: {id}, include: ['estado'] });
    }

    static update(id:number, data: Partial<InstitucionModel>, transaction?:Transaction){
        return Institucion.update(data, { 
            where: { id },
            transaction });
    }
}
import { Transaction } from "sequelize";
import {Usuario, UsuarioCreationModel, UsuarioModel} from "../models/usuario.model";

export class UsuarioRepository{
    static async findByEmail(email:string){
        const usuario = await Usuario.scope('withPasswordHash').findOne({where: {email} });
        return usuario;
    }

    static findById(id:number){
        const usuario = Usuario.findByPk(id);
        return usuario;
    }

    static update(id:number, dataToUpdate:Partial<Usuario>, transaction?:Transaction){
        return Usuario.update(dataToUpdate, {
            where: {id},
            transaction
        });
    }

    static create(newUser:UsuarioCreationModel , transaction?:Transaction){
        return Usuario.create(newUser, {transaction});
    }
}